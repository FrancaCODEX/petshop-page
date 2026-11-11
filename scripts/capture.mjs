import { existsSync } from "node:fs";
import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH ||
    (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
  headless: true,
  args: ["--no-sandbox"],
});
for (const [width, height] of [
  [1440, 1000],
  [1024, 900],
  [768, 1024],
  [390, 844],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto(process.env.BASE_URL || "http://localhost:5173");
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 70));
    }
    await Promise.all(
      [...document.images].map((im) => im.decode().catch(() => {})),
    );
    window.scrollTo(0, 0);
  });
  await page.screenshot({
    path: `screenshots/${width}-full.png`,
    fullPage: true,
  });
  await page.screenshot({ path: `screenshots/${width}-hero.png` });
  console.log(
    JSON.stringify({
      width,
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      broken: await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs
            .filter((im) => !im.complete || im.naturalWidth === 0)
            .map((im) => im.src),
        ),
      errors,
    }),
  );
  await page.close();
}
await browser.close();
