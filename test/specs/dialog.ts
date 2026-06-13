describe('Dialog API - DemoQA', () => {

  beforeEach(async () => {
    await browser.url('https://demoqa.com/alerts');
  });

  it('TC01: ALERT - đọc type, message rồi bấm OK (accept)', async () => {
    let loaiHopThoai = '';
    let noiDung = '';
    const handler = async (dialog: WebdriverIO.Dialog) => {
      loaiHopThoai = dialog.type();     
      noiDung      = dialog.message();   
      await dialog.accept();            
    };
    browser.on('dialog', handler);

    try {
      const ebtn = $('#alertButton');
      await ebtn.waitForClickable({ timeout: 10000 });
      await ebtn.click();
      await browser.waitUntil(() => noiDung !== '', {
        timeout: 5000,
        timeoutMsg: 'Alert không xuất hiện sau 5 giây',
      });

      expect(loaiHopThoai).toEqual('alert');
      expect(noiDung).toEqual('You clicked a button');
      expect(await browser.isAlertOpen()).toBe(false); 
    } finally {
      browser.off('dialog', handler);
    }
  });

  it('TC02: CONFIRM - bấm Cancel (dismiss) và kiểm tra kết quả trên trang', async () => {
    let noiDung = '';

    const handler = async (dialog: WebdriverIO.Dialog) => {
      noiDung = dialog.message();
      await dialog.dismiss();
    };
    browser.on('dialog', handler);

    try {
      await $('#confirmButton').click();

      await browser.waitUntil(() => noiDung !== '', {
        timeout: 5000,
        timeoutMsg: 'Confirm không xuất hiện sau 5 giây',
      });
      expect(noiDung).toEqual('Do you confirm action?');
      const eketQua = $('#confirmResult');
      await expect(eketQua).toHaveText('You selected Cancel');
    } finally {
      browser.off('dialog', handler);
    }
  });

  it('TC03: CONFIRM - bấm OK (accept) và kiểm tra kết quả', async () => {
    const handler = async (dialog: WebdriverIO.Dialog) => {
      await dialog.accept();            
    };
    browser.on('dialog', handler);

    try {
      await $('#confirmButton').click();
      await expect($('#confirmResult')).toHaveText('You selected Ok');
    } finally {
      browser.off('dialog', handler);
    }
  });

  it('TC04: PROMPT - đọc defaultValue, nhập text qua accept(text)', async () => {
    let loaiHopThoai = '';
    let giaTriMacDinh = '';
    const textCanNhap = 'WebdriverIO';

    const handler = async (dialog: WebdriverIO.Dialog) => {
      loaiHopThoai  = dialog.type();          
      giaTriMacDinh = dialog.defaultValue();  
      await dialog.accept(textCanNhap);      
    };
    browser.on('dialog', handler);

    try {
      await $('#promtButton').click();        
      await expect($('#promptResult')).toHaveText(`You entered ${textCanNhap}`);

      expect(loaiHopThoai).toEqual('prompt');
      expect(giaTriMacDinh).toEqual('');
    } finally {
      browser.off('dialog', handler);
    }
  });

  it('TC05: TIMER ALERT - hộp thoại hiện trễ sau ~5 giây', async () => {
    let noiDung = '';

    const handler = async (dialog: WebdriverIO.Dialog) => {
      noiDung = dialog.message();
      await dialog.accept();
    };
    browser.on('dialog', handler);

    try {
      await $('#timerAlertButton').click();
      await browser.waitUntil(() => noiDung !== '', {
        timeout: 10000,
        timeoutMsg: 'Timer alert không xuất hiện sau 10 giây',
      });

      expect(noiDung).toEqual('This alert appeared after 5 seconds');
    } finally {
      browser.off('dialog', handler);
    }
  });
});
