import assert from 'node:assert/strict';

async function selectCustomDdlOption(containerSelector, OptionText) {
  const eddl = await $(containerSelector);
  await eddl.scrollIntoView();

  const tagName = await eddl.getTagName();

  if (tagName.toLowerCase() === 'select') {
    await eddl.selectByVisibleText(OptionText);
    return;
  }

  await eddl.click();

  const eOptions = await $$(`${containerSelector} [id*="-option-"]`);
  await eOptions[0].waitForDisplayed({ timeout: 2000 });

  for (const opt of eOptions) {
    const optText = await opt.getText();

    if (optText === OptionText) {
      await opt.click();
      return;
    }
  }

  throw new Error(`Khong tim thay option: ${OptionText}`);
}

async function getSelectedOption(containerSelector) {
  const eddl = await $(containerSelector);
  const tagName = await eddl.getTagName();

  if (tagName.toLowerCase() === 'select') {
    return await eddl.$('option:checked').getText();
  }
    return await eddl.$('[class*="singleValue"]').getText();
}

describe('DemoQA Select Menu', () => {
  beforeEach(async () => {
    await browser.url('https://demoqa.com/select-menu');
    await $('#selectMenuContainer').waitForDisplayed({ timeout: 10000 });
  });

  it('TC01:  Chọn option “A root option” tại dropdown 1st sau đó verify selected option', async () => {
    await selectCustomDdlOption('#withOptGroup', 'A root option');

    const eselectedOption = await getSelectedOption('#withOptGroup');
    assert.equal(eselectedOption, 'A root option');
  });

  it('TC02:  Chọn option “Others” tại dropdown 2nd sau đó verify selected option', async () => {
    await selectCustomDdlOption('#selectOne', 'Other');

    const eselectedOption = await getSelectedOption('#selectOne');
    assert.equal(eselectedOption, 'Other');
  });

  it('TC03: Chọn option “Aqua” tại dropdown 3rd sau đó verify selected option', async () => {
    await selectCustomDdlOption('#oldSelectMenu', 'Aqua');

    const eselectedOption = await getSelectedOption('#oldSelectMenu');
    assert.equal(eselectedOption, 'Aqua');
  });
});