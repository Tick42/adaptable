# QuickSearch (AdaptableFunction)

The QuickSearch([AdaptableFunctionName](https://api.adaptabletools.com/modules/_src_predefinedconfig_common_types_.html#adaptablefunctionname): `QuickSearch`) Function  enables users to quickly find all instances of a specific value across all visible columns in the Grid.

### Quick Search Settings
There are 3 main settings:

- highlight any matching cells
- filter the grid so that it only shows those rows that have matching cells
- filter the grid so that it only shows those rows that have matching cells and highlight those cells

> Quick Search is a 'constant operation' - so, like with Advanced Search or Column Filters, it will run both when a new Quick Search is applied but also when data ticks or the visible columns change.

### Setting Highlight Style
The Quick Search UI allows users to set the Back Colour and Fore (i.e. font) colour of a matched cell.  

An alternative to setting the properties individually, is to set a css style classname for Quick Search (make sure to include the css style being referenced in your application code).

### Wildcards
You can use many of the same wildcards as in the Quick Filter Bar to refine your quick search.  

For example, '> 500' will return any cell that has a number greater than 500.  Or 't*' will return any cell that starts with t.  

See the Appendix at the bottom for more information on using wildcards.


## UI Elements
Quick Search includes the following UI Elements:

- **Popup** - Allows you to perform a Quick Search operation.  It also includes properties for setting Quick Search (e.g. colours for highlighted cells and whether to display rows with no matching cells)

- **Toolbar** - Enables Quick Search to be performed - and to provide both an existing column value or a new one.

- **Tool Panel** - Same as Toolbar above.

- **Dashboard** - Because Quick Search is such a popular function, it is embedded in the [Dashboard](./dashboard-function.md) Header itself - in Expanded, Collapsed and Floating Modes.

    > This option can be turned off by setting the `ShowQuickSearchInHeader` property in [Dashboard Predefined Config](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_dashboardstate_.dashboardstate.html#showquicksearchinheader)
    

## Entitlements
Quick Search supports these Entitlement Rules:

- **Full**: Everything is available to the User

- **Hidden**: Everything is hidden from the User (including Quick Search not being included in the Dashboard Header)

- **ReadOnly**: N/A

## FAQ

**Is it possible only to display rows that have cells that contain the search text?**

Yes. There are options to highlight matching cells, just return matching rows, or both.

**Is it possible to do free style quick search (e.g. '> 50')**

Yes, you can use a number of shortcuts in the Quick Search. These are similar to the ones that you can use in the Floating Filter.

**Can we limit Quick Search to particular columns or column data types?**

Yes, you can. By default Quick Search works across ALL columns in AdapTable.

However if you want to exclude a column then provide an implementation for the [excludecolumnfromquicksearch](https://api.adaptabletools.com/interfaces/_src_adaptableoptions_searchoptions_.searchoptions.html#excludecolumnfromquicksearch) function in the SearchOptions section of AdaptableOptions.

**Does Quick Search include hidden columns?**

No, Quick Search only operates on **visible columns** and it gets re-applied if the column visibility changes. 

If you have a large number of columns so that some are not visible in the current scrolling position, Quick Search will still operate on them.

**Does Quick Search update in real time as the data changes**

Yes it does. Like Advanced Search and Filters, Quick Search is reapplied as data changes.


### Quick Search Wildcards

| Symbol 	 | Value                    | Columns   | Example      |
| --------   | ------                   | ------        | ------       | 
| % 	     | Contains (the default)   | Text, Number  | 'S' or 'S%'  | 
| = 	     | Equals                   | Text, Number  | '=15'        | 
|<> 	     | Not Equals               | Number        | '<> 23'      | 
|>= 	     | Greater Than or Equals   | Number        | '>= 49'      | 
|> 	         | Greater Than             | Number        | '> 5'        | 
|<= 	     | Less Than or Equals      | Number        | '<= 49'      | 
|< 	         | Less Than                | Number        | '<5'         | 
|*	         | Starts With              | Text, Number  | 'd*'         | 
|!	         | Doesn't Contain          | Text, Number  | '!he'        | 


### Further Information

- [Quick Search State](https://api.adaptabletools.com/interfaces/_src_predefinedconfig_quicksearchstate_.quicksearchstate.html)

- [Quick Search Api](https://api.adaptabletools.com/interfaces/_src_api_quicksearchapi_.quicksearchapi.html)

- [Quick Search Demo](https://demo.adaptabletools.com/search/aggridquicksearchdemo)

- [Filtering Guide](../guides/adaptable-filtering-guide.md)

- [Server Functionality Guide](../guides/adaptable-server-functionality-guide.md)
