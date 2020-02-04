 # adaptable

<img src="./images/adaptablelogo.png"  width="250" height="69">

Repository for AdapTable - the most advanced and powerful HTML5 Data Management Solution available today - developed by [Adaptable Tools](www.adaptabletools.com).

AdapTable (previously known as the Adaptable Blotter) is a powerful HTML5 DataGrid add-on that integrates with the leading  components and provides all the additional, rich functionality that financial and other advanced users expect from their DataGrids and Data Tables.

AdapTable offers - out of the box - incredibly powerful searching, filtering, sorting, styling and editing functionality. It also provides unparalleled validation and audit functions, vital in the current regulatory and compliance environment. 

AdapTable supports a number of underlying vendor grid components, and new vendor grids are being added all the time.  Please contact us if you would like us to implement your favourite HTML5 grid control.

AdapTable is fully data agnostic and can work with any data set you provide it with. It is suitable for all data, all asset classes, all grid types, all locations and all use cases.


![AdapTable image](./images/adaptable.png)

## Upgrade Guide

Version 6 of AdapTable has introduced many new functionality changes and upgrades and also some new, exciting, ways of interacting with the product.  

For more information please see the [Version 6 Upgrade Guide](./packages/adaptable/upgrade-guide.md)

## Using AdapTable

AdapTable comes in 3 variants:
 
  * **'core'** (vanilla) javascript version
  
  To use this install `@adaptabletools/adaptable` 
  
  > For more info, see the [Adaptable Core readme](./packages/adaptable/README.md)
  
  * **React Wrapper**
  
  To use this install `@adaptabletools/adaptable-react-aggrid`
  
  > For more info, see the [React Wrapper readme](./packages/adaptable-react-aggrid/README.md)
  
  * **Angular Wrapper**
  
  To use this, install `@adaptabletools/adaptable-angular-aggrid`
  
  > For more info, see the [Angular Wrapper readme](./packages/adaptable-ng-aggrid/README.md)
  
  Each of these packages has its own initialisation requirements so please read the appropriate documentation

## Installing AdapTable

AdapTable is distributed via a private npm registry [https://registry.adaptabletools.com](https://registry.adaptabletools.com).

To gain access to this registry please follow these steps:

1. Acquire a commercial AdapTable License - you can email [`support@adaptabletools.com`](mailto:support@adaptabletools.com), who will provide you with your unique credentials.

2. Point your npm client to the correct registry for packages under the '@adaptabletools' scope.

```sh
npm config set @adaptabletools:registry https://registry.adaptabletools.com

```
If you are using yarn then it will be:
```sh
yarn config set @adaptabletools:registry https://registry.adaptabletools.com
```

3. Login to the Adaptable private registry:

```sh
npm login --registry=https://registry.adaptabletools.com --scope=@adaptabletools
```

4. Enter the credentials that were provided to you by the AdapTable support team:

  * login name
  * email
  * password

5. Confirm that you are logged in correctly by using whoami:

```
npm whoami --registry=https://registry.adaptabletools.com
```

This should display the username you received from use as the current login on the private registry

> note: this does not affect your username/login session on the public npm registry

6.  Install the relevant AdapTable package you need.

For core it will be:

```
npm i @adaptabletools/adaptable
```

For the ag-Grid React Wrapper it will be:

```
npm i @adaptabletools/adaptable-react-aggrid
```

For the ag-Grid Angular Wrapper it will be:

```
npm i @adaptabletools/adaptable-angular-aggrid
```

## Plugins
AdapTable since version 6 includes plugins to reduce the download size of the 'core' project and to allow you to select only the functionality you want.  

There are currently two plugins:

- **Charts** (`@adaptabletools/adaptable-charts-finance`)

> Courtesy of [Infragistics](https://www.infragistics.com/products/ignite-ui-react) - provides Category, Pie, Doughnut, Sparkline and Financial charts.  

- **Finance** (`@adaptabletools/adaptable-plugin-finance`)

> Adds additional functionality of benefit to advanced financial users (currently very empty but will be added to over time)


## Licences
A licence for AdapTable provides access to all product features as well as quarterly updates and enhancements through the lifetime of the licence, comprehensive support, and access to all 3rd party libraries.

Licences can be purchased individually, for a team (minimum 30 end-users), for an organisation or for integration into software for onward sale.

We can make a trial licence available for a short period of time to allow you to try out AdapTable for yourself.

Please contact [`sales@adaptabletools.com`](mailto:sales@adaptabletools.com) for more information.

## Demo

To see AdapTable in action visit our [Demo Site](https://demo.adaptabletools.com).  Here you can see a large number of AdapTable demos each showing a different feature, function or option in AdapTable (using dummy data sets).

 ## Example Projects

We have added a few example projects to Github to help you to understand how to use AdapTable.

These include:
* [Angular Wrapper Example](https://github.com/AdaptableTools/example-adaptable-angular-aggrid)
 
* [React Wrapper Example](https://github.com/AdaptableTools/example-adaptable-angular-aggrid)
  
* [Building Minifed File (with ParcelJS) Example](https://github.com/AdaptableTools/example-adaptable-with-parceljs)
   
* [ipushpull Example](https://github.com/AdaptableTools/example-adaptable-ipushpull-integration)
 
 
## Help

Further information about AdapTable is available at our [Website](www.adaptabletools.com) and our [Help Site](https://adaptabletools.zendesk.com/hc/en-us)

Developers can learn how to access AdapTable programmatically at [AdapTable Developer Documentation](https://api.adaptabletools.com) 

## Other Read Mes

Other Read Me docs that will be of interest are:

 - [Version 6 Upgrade Guide](./packages/adaptable/upgrade-guide.md)

 - [Adaptable Core](./packages/adaptable/README.md)

 - [React Wrapper](./packages/adaptable-react-aggrid/README.md)
  
 - [Angular Wrapper](./packages/adaptable-ng-aggrid/README.md)
 
 - [Adaptable Theming and Styling Guide](./packages/adaptable/adaptable-theming-guide.md)

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
