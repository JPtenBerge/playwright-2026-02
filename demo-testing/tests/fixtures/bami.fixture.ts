import { test as base } from "@playwright/test";
import { BamiPO } from "../po/bami.po";

// fixture = "alles wat je nodig hebt om een test uit te voeren"

type BamiFixture = {
  bamiPO: BamiPO;
};

export const test = base.extend<BamiFixture>({
  bamiPO: async ({ page }, use) => {
    await use(new BamiPO(page));
  },
});
