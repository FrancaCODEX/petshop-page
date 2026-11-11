import { existsSync } from "node:fs";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH ||
    (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
  headless: true,
  args: ["--no-sandbox"],
});
const baseURL = process.env.BASE_URL || "http://localhost:5173";
const results = [];
const failures = [];
await mkdir("docs", { recursive: true });
await mkdir("screenshots", { recursive: true });
async function run(name, fn) {
  try {
    const details = await fn();
    results.push({ name, status: "pass", details });
    console.log(`PASS ${name}`);
  } catch (e) {
    failures.push({ name, error: String(e) });
    console.error(`FAIL ${name}: ${e.message}`);
  }
}
async function closeModal(page) {
  await page.getByRole("button", { name: "Fechar janela" }).click();
  await expect(page.locator("dialog[open]")).toHaveCount(0);
}
for (const width of [390, 768, 1024, 1440]) {
  const context = await browser.newContext({
    viewport: { width, height: width === 768 ? 1024 : 900 },
    deviceScaleFactor: 1,
    timezoneId: "America/Sao_Paulo",
    reducedMotion: "reduce",
    hasTouch: width === 390,
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  const submissions = [];
  page.on("pageerror", (e) => consoleErrors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("requestfailed", (r) => failedRequests.push(r.url()));
  page.on("request", (r) => {
    if (!["GET", "HEAD"].includes(r.method())) submissions.push(r.url());
  });
  await page.goto(baseURL);
  await page.evaluate(() => document.fonts.ready);
  await run(`${width}: página, fontes, assets e overflow`, async () => {
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
      await Promise.all([...document.images].map((im) => im.decode()));
      window.scrollTo(0, 0);
    });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    assert.deepEqual(
      await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs
            .filter((im) => !im.complete || im.naturalWidth === 0)
            .map((im) => im.src),
        ),
      [],
    );
    assert.equal(
      await page.evaluate(() => document.fonts.check("800 16px Nunito")),
      true,
    );
    assert.equal(await page.locator("h1").count(), 1);
    const broken = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .filter((a) => !document.getElementById(a.hash.slice(1)))
          .map((a) => a.hash),
      );
    assert.deepEqual(broken, []);
    const cropped = await page
      .locator(".product-image img")
      .evaluateAll((imgs) =>
        imgs
          .map((im) => ({
            h: im.getBoundingClientRect().height,
            parent: im.parentElement.getBoundingClientRect().height,
          }))
          .filter((x) => x.h > x.parent),
      );
    assert.deepEqual(cropped, []);
    return {
      fonts: "Nunito local",
      images: await page.locator("img").count(),
      horizontalOverflow: false,
    };
  });
  await run(`${width}: navegação e menu`, async () => {
    if (width < 1100) {
      const toggle = page.locator(".menu-toggle");
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await page
        .locator("#menu-mobile")
        .getByRole("link", { name: "Serviços", exact: true })
        .click();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      assert.equal(new URL(page.url()).hash, "#servicos");
      await toggle.click();
      await page.keyboard.press("Escape");
      await expect(toggle).toBeFocused();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
    } else {
      await page
        .locator(".desktop-nav")
        .getByRole("link", { name: "Serviços", exact: true })
        .click();
      assert.equal(new URL(page.url()).hash, "#servicos");
    }
  });
  await run(`${width}: agendamento inválido e válido`, async () => {
    await page
      .locator(".service-card")
      .filter({ hasText: "Veterinário" })
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByLabel("Serviço", { exact: true })).toHaveValue(
      "Veterinário",
    );
    await dialog
      .getByRole("button", { name: "Revisar simulação de agendamento" })
      .click();
    await expect(dialog.getByLabel("Seu nome", { exact: true })).toBeFocused();
    assert.ok((await dialog.locator('[aria-invalid="true"]').count()) >= 5);
    await dialog.getByLabel("Seu nome", { exact: true }).fill("Marina Silva");
    await dialog.getByLabel("E-mail", { exact: true }).fill("invalido");
    await dialog.getByLabel("Nome do pet", { exact: true }).fill("Thor");
    await dialog
      .getByLabel("Data desejada", { exact: true })
      .fill("2020-01-01");
    await dialog
      .getByLabel("Período desejado", { exact: true })
      .selectOption("Manhã");
    await dialog.getByRole("checkbox").check();
    await dialog
      .getByRole("button", { name: "Revisar simulação de agendamento" })
      .click();
    await expect(
      dialog.getByText("Informe um e-mail válido, como voce@exemplo.com."),
    ).toBeVisible();
    await expect(
      dialog.getByText("Escolha uma data entre hoje e os próximos 6 meses."),
    ).toBeVisible();
    await dialog
      .getByLabel("E-mail", { exact: true })
      .fill("marina@example.com");
    const today = await dialog
      .getByLabel("Data desejada", { exact: true })
      .getAttribute("min");
    await dialog.getByLabel("Data desejada", { exact: true }).fill(today);
    await dialog
      .getByRole("button", { name: "Revisar simulação de agendamento" })
      .click();
    await expect(
      dialog.getByText(
        "Nenhum horário foi reservado e nenhum dado foi enviado.",
      ),
    ).toBeVisible();
    await expect(dialog.getByRole("status")).toContainText(
      "Thor · Veterinário",
    );
    await dialog.screenshot({ path: `screenshots/${width}-booking-demo.png` });
    await closeModal(page);
  });
  await run(`${width}: produtos, filtros, sacola e limites`, async () => {
    await page
      .locator(".product-filters")
      .getByRole("button", { name: "Brinquedos", exact: true })
      .click();
    await expect(page.locator(".product-card")).toHaveCount(1);
    await expect(page.locator(".product-card")).toContainText("Corda dental");
    await page
      .locator(".product-filters")
      .getByRole("button", { name: "Todos", exact: true })
      .click();
    await expect(page.locator(".product-card")).toHaveCount(4);
    for (const name of [
      "Ração Premium",
      "Corda dental",
      "Caminha Confort",
      "Shampoo Natural",
    ]) {
      await page.locator(".product-card").filter({ hasText: name }).click();
      await expect(
        page.getByRole("dialog").getByRole("heading", { level: 2 }),
      ).toHaveText(name);
      await closeModal(page);
    }
    await page
      .locator(".product-card")
      .filter({ hasText: "Corda dental" })
      .click();
    await page.getByRole("button", { name: "Adicionar à sacola demo" }).click();
    await expect(page.getByRole("status")).toContainText(
      "Nenhuma compra realizada",
    );
    await closeModal(page);
    await page
      .getByRole("button", { name: /Abrir sacola de demonstração/ })
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.locator(".cart-total")).toContainText("29,90");
    await dialog
      .getByRole("button", { name: "Aumentar quantidade de Corda dental" })
      .click();
    await expect(dialog.locator(".cart-total")).toContainText("59,80");
    for (let i = 2; i < 10; i++)
      await dialog
        .getByRole("button", { name: "Aumentar quantidade de Corda dental" })
        .click();
    await expect(
      dialog.getByRole("button", {
        name: "Aumentar quantidade de Corda dental",
      }),
    ).toBeDisabled();
    await dialog
      .getByRole("button", { name: "Diminuir quantidade de Corda dental" })
      .click();
    await expect(
      dialog.getByRole("button", {
        name: "Aumentar quantidade de Corda dental",
      }),
    ).toBeEnabled();
    await dialog
      .getByRole("button", { name: "Remover Corda dental da sacola" })
      .click();
    await expect(
      dialog.getByText("Ainda tem espaço para um mimo."),
    ).toBeVisible();
    await closeModal(page);
  });
  await run(`${width}: Luna e formulário de interesse`, async () => {
    await page.getByRole("button", { name: "Quero conhecer a Luna" }).click();
    const dialog = page.getByRole("dialog");
    await dialog
      .getByRole("button", { name: "Simular interesse na Luna" })
      .click();
    await expect(dialog.getByLabel("Seu nome", { exact: true })).toBeFocused();
    await dialog.getByLabel("Seu nome", { exact: true }).fill("Joana Lima");
    await dialog
      .getByLabel("E-mail", { exact: true })
      .fill("joana@example.com");
    await dialog
      .getByLabel("Como seria a rotina da Luna com você?")
      .fill("Luna terá um lar protegido e cuidados adequados diariamente.");
    await dialog.getByRole("checkbox").check();
    await dialog
      .getByRole("button", { name: "Simular interesse na Luna" })
      .click();
    await expect(dialog.getByRole("status")).toContainText(
      "Nenhuma solicitação de adoção foi enviada.",
    );
    await closeModal(page);
  });
  await run(`${width}: clube, quatro artigos, mapa e contato`, async () => {
    await page.getByRole("button", { name: "Conhecer o clube" }).click();
    await expect(page.getByRole("dialog")).toContainText(
      "Nenhuma assinatura é realizada",
    );
    await closeModal(page);
    for (const selector of [
      ".featured-article",
      ".article-row:nth-child(1)",
      ".article-row:nth-child(2)",
      ".article-row:nth-child(3)",
    ]) {
      await page.locator(selector).click();
      await expect(page.locator(".article-content section")).toHaveCount(3);
      await closeModal(page);
    }
    await page
      .getByRole("button", { name: "Ver localização", exact: true })
      .click();
    await expect(page.getByRole("dialog")).toContainText("são ilustrativos");
    await closeModal(page);
    await page.getByRole("button", { name: "Falar com a equipe" }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByLabel("Seu nome", { exact: true }).fill("João Souza");
    await dialog.getByLabel("E-mail", { exact: true }).fill("joao@example.com");
    await dialog
      .getByLabel("Sua mensagem")
      .fill("Gostaria de conhecer os serviços de vocês.");
    await dialog.getByRole("checkbox").check();
    await dialog
      .getByRole("button", { name: "Revisar mensagem de demonstração" })
      .click();
    await expect(dialog.getByRole("status")).toContainText(
      "Esta mensagem não foi enviada.",
    );
    await closeModal(page);
  });
  await run(`${width}: teclado, modal e restauração de foco`, async () => {
    const trigger = page
      .locator(".hero-actions")
      .getByRole("button", { name: "Agendar serviço" });
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press("Tab");
      assert.ok(
        await page.evaluate(() => !!document.activeElement.closest("dialog")),
      );
    }
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    const slider = page.getByRole("slider");
    await slider.focus();
    await page.keyboard.press("Home");
    await expect(slider).toHaveValue("0");
    await page.keyboard.press("ArrowRight");
    await expect(slider).toHaveValue("1");
    await page.keyboard.press("End");
    await expect(slider).toHaveValue("100");
    await page.keyboard.press("Home");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await expect(slider).toHaveValue("2");
    const animation = await page
      .locator(".hero-art>img")
      .evaluate((e) => getComputedStyle(e).animationName);
    assert.equal(animation, "none");
  });
  await run(`${width}: auditoria axe da página e formulários`, async () => {
    const pageResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    await page
      .locator(".hero-actions")
      .getByRole("button", { name: "Agendar serviço" })
      .click();
    await page
      .getByRole("button", { name: "Revisar simulação de agendamento" })
      .click();
    const modalResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    await closeModal(page);
    const violations = [...pageResults.violations, ...modalResults.violations];
    await writeFile(
      `docs/axe-${width}.json`,
      JSON.stringify(
        { page: pageResults.violations, booking: modalResults.violations },
        null,
        2,
      ),
    );
    assert.equal(
      violations.length,
      0,
      JSON.stringify(
        violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
        null,
        2,
      ),
    );
    return { violations: 0 };
  });
  await run(`${width}: console, rede e ausência de envio real`, async () => {
    assert.deepEqual(consoleErrors, []);
    assert.deepEqual(failedRequests, []);
    assert.deepEqual(submissions, []);
    return { consoleErrors: 0, failedRequests: 0, submissions: 0 };
  });
  await context.close();
}
await run("390: gesto de toque no comparador e rolagem vertical", async () => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(baseURL);
  const slider = page.getByRole("slider");
  await slider.scrollIntoViewIfNeeded();
  const rect = await slider.boundingBox();
  const client = await context.newCDPSession(page);
  const y = rect.y + rect.height / 2;
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: rect.x + rect.width * 0.5, y }],
  });
  for (let step = 1; step <= 10; step++)
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: rect.x + rect.width * (0.5 + step * 0.035), y }],
    });
  await client.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  assert.ok(
    Number(await slider.inputValue()) > 65,
    "Native range did not respond to touch drag",
  );
  const before = await page.evaluate(() => scrollY);
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: rect.x + rect.width * 0.3, y }],
  });
  for (let step = 1; step <= 8; step++)
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: rect.x + rect.width * 0.3, y: y - step * 15 }],
    });
  await client.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await page.waitForTimeout(250);
  assert.ok(
    (await page.evaluate(() => scrollY)) > before + 20,
    "Vertical swipe did not scroll",
  );
  await context.close();
  return {
    engine: "Chromium",
    input: "CDP synthesized touch",
    physicalDevice: false,
  };
});
await run("320 e viewport equivalente a zoom: sem overflow", async () => {
  const page = await browser.newPage({ viewport: { width: 320, height: 640 } });
  await page.goto(baseURL);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await page.setViewportSize({ width: 720, height: 500 });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await page.close();
});
await browser.close();
await writeFile(
  "docs/verification-results.json",
  JSON.stringify(
    {
      baseURL,
      engine: "Chromium",
      tests: results.length + failures.length,
      passed: results.length,
      failed: failures.length,
      results,
      failures,
    },
    null,
    2,
  ),
);
console.log(`${results.length} passed, ${failures.length} failed`);
process.exitCode = failures.length ? 1 : 0;
