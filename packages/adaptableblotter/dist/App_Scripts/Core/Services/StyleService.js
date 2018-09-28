"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const EnumExtensions_1 = require("../Extensions/EnumExtensions");
const StyleConstants = require("../Constants/StyleConstants");
const StringExtensions_1 = require("../Extensions/StringExtensions");
const StyleHelper_1 = require("../Helpers/StyleHelper");
const StrategyIds = require("../Constants/StrategyIds");
//Somehow all the CSSRules do not work so I end up just forcing the innerHTML......
class StyleService {
    constructor(blotter) {
        this.blotter = blotter;
        // Create the <style> tag
        this.style = document.createElement("style");
        this.style.id = `${blotter.BlotterOptions.adaptableBlotterContainer}-style`;
        // WebKit hack :(
        this.style.appendChild(document.createTextNode(""));
        // Add the <style> element to the page
        document.head.appendChild(this.style);
        this.sheet = this.style.sheet;
        this.InitState();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState());
    }
    InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell
            || this.ConditionalStyleState != this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle
            || this.QuickSearchState != this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch
            || this.FormatColumnState != this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle;
            this.FormatColumnState = this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn;
            this.QuickSearchState = this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
            this.clearCSSRules();
            this.FormatColumnState.FormatColumns.forEach((formatColumn, index) => {
                let styleName = StyleHelper_1.StyleHelper.CreateIndexedStyleName(StrategyIds.FormatColumnStrategyId, this.FormatColumnState.FormatColumns.indexOf(formatColumn), this.blotter);
                this.addCSSRule("." + styleName, 'background-color: ' + formatColumn.Style.BackColor + ' !important;color: ' + formatColumn.Style.ForeColor + ' !important;font-weight: ' + formatColumn.Style.FontWeight + ' !important;font-style: ' + formatColumn.Style.FontStyle + ' !important;' + (formatColumn.Style.FontSize ? ('font-size: ' + EnumExtensions_1.EnumExtensions.getCssFontSizeFromFontSizeEnum(formatColumn.Style.FontSize) + ' !important') : ''));
            });
            //we define first the row conditions and then columns so priority of CS col > CS Row and allow a record to have both
            this.ConditionalStyleState.ConditionalStyles.filter(x => x.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row).forEach((element, index) => {
                let styleName = StyleHelper_1.StyleHelper.CreateIndexedStyleName(StrategyIds.ConditionalStyleStrategyId, this.ConditionalStyleState.ConditionalStyles.indexOf(element), this.blotter);
                this.addCSSRule("." + styleName, 'background-color: ' + element.Style.BackColor + ' !important;color: ' + element.Style.ForeColor + ' !important;font-weight: ' + element.Style.FontWeight + ' !important;font-style: ' + element.Style.FontStyle + ' !important;' + (element.Style.FontSize ? ('font-size: ' + EnumExtensions_1.EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) + ' !important') : ''));
            });
            this.ConditionalStyleState.ConditionalStyles.filter(x => x.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column).forEach((element, index) => {
                let styleName = StyleHelper_1.StyleHelper.CreateIndexedStyleName(StrategyIds.ConditionalStyleStrategyId, this.ConditionalStyleState.ConditionalStyles.indexOf(element), this.blotter);
                this.addCSSRule("." + styleName, 'background-color: ' + element.Style.BackColor + ' !important;color: ' + element.Style.ForeColor + ' !important;font-weight: ' + element.Style.FontWeight + ' !important;font-style: ' + element.Style.FontStyle + ' !important;' + (element.Style.FontSize ? ('font-size: ' + EnumExtensions_1.EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) + ' !important') : ''));
            });
            // quick search
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.QuickSearchState.Style.ClassName)) {
                let styleName = StyleHelper_1.StyleHelper.CreateStyleName(StrategyIds.QuickSearchStrategyId, this.blotter);
                this.addCSSRule("." + styleName, 'background-color: ' + this.QuickSearchState.Style.BackColor + ' !important;color: ' + this.QuickSearchState.Style.ForeColor + ' !important;font-weight: ' + this.QuickSearchState.Style.FontWeight + ' !important;font-style: ' + this.QuickSearchState.Style.FontStyle + ' !important;' + (this.QuickSearchState.Style.FontSize ? ('font-size: ' + EnumExtensions_1.EnumExtensions.getCssFontSizeFromFontSizeEnum(this.QuickSearchState.Style.FontSize) + ' !important') : ''));
            }
            //we define last Flash since it has the highest priority
            this.FlashingCellState.FlashingCells.forEach((element, index) => {
                this.addCSSRule("." + StyleConstants.FLASH_UP_STYLE + index, 'background-color: ' + element.UpColor + ' !important');
                this.addCSSRule("." + StyleConstants.FLASH_DOWN_STYLE + index, 'background-color: ' + element.DownColor + ' !important');
            });
        }
    }
    clearCSSRules() {
        this.style.innerHTML = "";
        // let i = this.sheet.cssRules.length - 1;
        // while (i >= 0) {
        //     if ("deleteRule" in this.sheet) { this.sheet.deleteRule(i); }
        //     else if ("removeRule" in this.sheet) { this.sheet.removeRule(i); }
        //     i--;
        // }
    }
    addCSSRule(selector, rules) {
        this.style.innerHTML += selector + "{" + rules + "}" + "\n";
        // if ("insertRule" in this.sheet) {
        //     this.style.innerHTML += selector + "{" + rules + "}"
        //     this.sheet.insertRule(selector + "{" + rules + "}", this.sheet.cssRules.length);
        // }
        // else if ("addRule" in this.sheet) {
        //     this.sheet.addRule(selector, rules);
        // }
    }
}
exports.StyleService = StyleService;