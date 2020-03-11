import { ITrade, ExamplesHelper } from './ExamplesHelper';
import { ColDef, GridOptions } from '@ag-grid-community/all-modules';
import LoggingHelper from '../../src/Utilities/Helpers/LoggingHelper';

export interface IGlueDemoTrade {
  tradeId: number;
  customer: string;
  contact: any;
  interopSymbols: any;
  tradeDate: Date;
  buySell: string;
  instrument: any;
  isin: string;
  bbg_symbol: string;
  symbol_name: string;
  quantity: number;
  price: number;
  originalCurrency: string;
  totalAmount: number;
  commission: number;
  fees: number;
  contextPairs: any;
}

export class GlueIntegrationExampleHelper {
  examplesHelper: ExamplesHelper = new ExamplesHelper();

  public async getTrades(count: number) {
    const contacts = (await this.getContacts()).slice(0, count > 0 ? count : undefined);
    return contacts.map((contact, index) => this.createTrade(contact, index));
  }

  createTrade(contact: any, i: number): IGlueDemoTrade {
    // tradeDate
    const tradeDate = this.examplesHelper.generateRandomDate(-4, 5);
    // buy_sell:
    const buySell = this.examplesHelper.generateRandomBool() ? 'Buy' : 'Sell';
    let realInstrument: any;
    let instrument;

    while (!instrument) {
      realInstrument = this.examplesHelper.getRandomItem(contact.context.portfolio);
      instrument = this.getSymbolISINCompanyNameMap().find(
        oneInstrument => oneInstrument.bbgsymbol === realInstrument.ric
      );
    }

    // isin
    const isin = instrument.isin;
    // bbg_symbol
    const bbg_symbol = instrument.bbgsymbol;
    // symbol_name
    const symbol_name = realInstrument.description;
    // quantity
    const quantity = realInstrument.shares;
    // price
    const price = realInstrument.price;
    // originalCurrency
    const originalCurrency = instrument.currency;
    // totalAmount
    const totalAmount = price * quantity;
    // commission
    const commission = (this.examplesHelper.generateRandomInt(2, 7) * quantity * price) / 100;
    // fees
    const fees = (this.examplesHelper.generateRandomInt(1, 2) * price) / 100;

    const interopSymbols = [
      {
        symbol: 'Client',
        value: contact._id,
        displayValue: contact.displayName,
      },
      {
        symbol: 'Trade',
        value: instrument.bbgsymbol,
        displayValue: instrument.name,
      },
    ];

    const contextPairs = {
      contact: 'contact',
      partyPortfolio: {
        ric: 'bbg_symbol',
        description: 'symbol_name',
        price: 'price',
        shares: 'quantity',
      },
    };

    const incomingContextChangePairs = {
      contact: {
        displayName: 'customer',
      },
      partyPortfolio: {
        ric: 'bbg_symbol',
      },
    };

    const trade = {
      tradeId: i + 1,
      customer: contact.displayName,
      contact,
      tradeDate,
      buySell,
      isin,
      instrument,
      bbg_symbol,
      symbol_name,
      quantity,
      price,
      originalCurrency,
      totalAmount,
      commission,
      fees,
      interopSymbols,
      contextPairs,
      incomingContextChangePairs,
    };
    return trade;
  }

  private getSymbolISINCompanyNameMap() {
    return [
      {
        t42symbol: 'AAL.L',
        bbgsymbol: 'AAL:LN',
        isin: 'GB00B1XZS820',
        name: 'Anglo American PLC',
        refPrice: 2165,
        currency: 'GBP',
      },
      {
        t42symbol: 'AAPL',
        bbgsymbol: 'AAPL:US',
        isin: 'US0378331005',
        name: 'Apple Inc',
        refPrice: 310.33,
        currency: 'USD',
      },
      {
        t42symbol: 'AMZN',
        bbgsymbol: 'AMZN:US',
        isin: 'US0231351067',
        name: 'Amazon.com Inc',
        refPrice: 1883.16,
        currency: 'USD',
      },
      {
        t42symbol: 'BABA',
        bbgsymbol: 'BABA:US',
        isin: 'US01609W1027',
        name: 'Alibaba Group Holding Ltd',
        refPrice: 223.83,
        currency: 'USD',
      },
      {
        t42symbol: 'BARC.L',
        bbgsymbol: 'BARC:LN',
        isin: 'GB0031348658',
        name: 'Barclays PLC',
        refPrice: 181.0,
        currency: 'GBP',
      },
      {
        t42symbol: 'BMW.DE',
        bbgsymbol: 'BMW:GR',
        isin: 'DE0005190003',
        name: 'Bayerische Motoren Werke AG',
        refPrice: 74.26,
        currency: 'EUR',
      },
      {
        t42symbol: 'CRM',
        bbgsymbol: 'CRM:US',
        isin: 'US79466L3024',
        name: 'salesforce.com Inc',
        refPrice: 180.2,
        currency: 'USD',
      },
      {
        t42symbol: 'FB',
        bbgsymbol: 'FB:US',
        isin: 'US30303M1027',
        name: 'Facebook Inc',
        refPrice: 218.06,
        currency: 'USD',
      },
      {
        t42symbol: 'GOOG',
        bbgsymbol: 'GOOGL:US',
        isin: 'US02079K1079',
        name: 'Alphabet Inc',
        refPrice: 1428.96,
        currency: 'USD',
      },
      {
        t42symbol: 'JPM',
        bbgsymbol: 'JPM:US',
        isin: 'US4642862514',
        name: 'JPMorgan Chase & Co',
        refPrice: 136.07,
        currency: 'USD',
      },
      {
        t42symbol: 'KHC',
        bbgsymbol: 'KHC:US',
        isin: 'US5007541064',
        name: 'Kraft Heinz Co/The',
        refPrice: 30.7,
        currency: 'USD',
      },
      {
        t42symbol: 'MSFT',
        bbgsymbol: 'MSFT:US',
        isin: 'US5949181045',
        name: 'Microsoft Corp',
        refPrice: 161.34,
        currency: 'USD',
      },
      {
        t42symbol: 'NFLX',
        bbgsymbol: 'NFLX:US',
        isin: 'US64110L1061',
        name: 'Netflix Inc',
        refPrice: 329.05,
        currency: 'USD',
      },
      {
        t42symbol: 'NTES',
        bbgsymbol: 'NTES:US',
        isin: 'US64110W1027',
        name: 'NetEase Inc',
        refPrice: 338.91,
        currency: 'USD',
      },
      {
        t42symbol: 'TEAM',
        bbgsymbol: 'TEAM:US',
        isin: 'GB00BZ09BD16',
        name: 'Atlassian Corp PLC',
        refPrice: 133.9,
        currency: 'USD',
      },
      {
        t42symbol: 'TSCO',
        bbgsymbol: 'TSCO:LN',
        isin: 'GB0008847096',
        name: 'Tesco PLC',
        refPrice: 249.4,
        currency: 'GBP',
      },
      {
        t42symbol: 'VOD.L',
        bbgsymbol: 'VOD:LN',
        isin: 'GB00BH4HKS39',
        name: 'Vodafone Group PLC',
        refPrice: 151.64,
        currency: 'GBP',
      },
    ];
  }

  public getGridOptionsTrade(rowData: any): GridOptions {
    const trades = this.examplesHelper.getGridOptionsTrade(rowData);
    trades.columnDefs = this.getTradeSchema();
    return trades;
  }

  public createAdaptableOptionsTrade(gridOptions: GridOptions, adaptableId: string) {
    return this.examplesHelper.createAdaptableOptionsTrade(gridOptions, adaptableId);
  }

  public getTradeSchema(): ColDef[] {
    var schema: any[] = [];
    schema.push({
      headerName: 'Trade Id',
      field: 'tradeId',
      editable: true,
      type: ['hello', 'abColDefNumberx'],
      sortable: true,
      filter: true,
      resizable: true,
      // headerCheckboxSelection: true,
      //  checkboxSelection: true,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    });
    schema.push({
      headerName: 'Customer',
      field: 'customer',
      editable: true,
      filter: true,
      sortable: true,
      enableRowGroup: true,
      type: 'abColDefString',
      resizable: true,
      objectType: 'Client',
    });
    schema.push({
      headerName: 'Buy/Sell',
      field: 'buySell',
      enableValue: true,
      editable: true,
      sortable: true,
      filter: true,
      enablePivot: true,
      resizable: true,
    });
    schema.push({
      headerName: 'ISIN',
      field: 'isin',
      editable: true,
      filter: true,
      sortable: true,
      enableRowGroup: true,
      type: 'abColDefString',
      resizable: true,
    });
    schema.push({
      headerName: 'BBG Symbol',
      field: 'bbg_symbol',
      editable: true,
      filter: true,
      sortable: true,
      enableRowGroup: true,
      type: 'abColDefString',
      resizable: true,
      objectType: 'Symbol',
    });
    schema.push({
      headerName: 'Security Description',
      field: 'symbol_name',
      editable: true,
      filter: true,
      sortable: true,
      enableRowGroup: true,
      type: 'abColDefString',
      resizable: true,
    });
    schema.push({
      headerName: 'Quantity',
      field: 'quantity',
      enableValue: true,
      editable: true,
      sortable: true,
      cellClass: 'number-cell',
      type: 'abColDefNumber',
      filter: true,
      resizable: true,
    });
    schema.push({
      headerName: 'Unit Price',
      field: 'price',
      enableValue: true,
      editable: true,
      sortable: true,
      cellClass: 'number-cell',
      type: 'abColDefNumber',
      filter: true,
      resizable: true,
      valueFormatter: this.examplesHelper.twoDecimalPlaceFormatter,
    });
    schema.push({
      headerName: 'Original Currency',
      field: 'originalCurrency',
      enableValue: true,
      editable: true,
      sortable: true,
      type: 'abColDefString',
      filter: true,
      resizable: true,
    });
    //    schema.push({
    //      headerName: 'Total Price',
    //      field: 'totalAmount',
    //      enableValue: true,
    //      editable: true,
    //      sortable: true,
    //      cellClass: 'number-cell',
    //      type: 'abColDefNumber',
    //      filter: true,
    //      resizable: true,
    //      valueFormatter: this.examplesHelper.twoDecimalPlaceFormatter,
    //    });
    schema.push({
      headerName: 'Total Commission',
      field: 'commission',
      enableValue: true,
      editable: true,
      sortable: true,
      cellClass: 'number-cell',
      type: 'abColDefNumber',
      filter: true,
      resizable: true,
      valueFormatter: this.examplesHelper.twoDecimalPlaceFormatter,
    });
    schema.push({
      headerName: 'Fees',
      field: 'fees',
      enableValue: true,
      editable: true,
      sortable: true,
      cellClass: 'number-cell',
      type: 'abColDefNumber',
      filter: true,
      resizable: true,
      valueFormatter: this.examplesHelper.twoDecimalPlaceFormatter,
    });
    schema.push({
      headerName: 'Trade Date',
      field: 'tradeDate',
      editable: true,
      enableRowGroup: true,
      cellEditorParams: {
        useFormatter: true,
      },
      valueParser: this.examplesHelper.dateParseragGrid,
      valueFormatter: this.examplesHelper.shortDateFormatteragGrid,
      filter: 'agDateColumnFilter',
      type: 'abColDefDate',
      resizable: true,
    });

    return schema;
  }

  contacts = null;
  private async getContacts(): Promise<any[]> {
    if (this.contacts === null) {
      const response = await fetch('http://localhost:22060/clients');
      this.contacts = await response.json();
    }
    return this.contacts!;
  }

  names: string[] | null = null;
  protected async getNames(): Promise<string[]> {
    if (this.names === null) {
      this.names = (await this.getContacts()).map(c => c.displayName);
    }
    return this.names;
  }
}
