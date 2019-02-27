export declare module StringExtensions {
    function IsNull(stringToCheck: string): boolean;
    function IsNotNull(stringToCheck: string): boolean;
    function IsEmpty(stringToCheck: string): boolean;
    function IsNotEmpty(stringToCheck: string): boolean;
    function IsNullOrEmpty(stringToCheck: string): boolean;
    function IsNotNullOrEmpty(stringToCheck: string): boolean;
    function PlaceSpaceBetweenCapitalisedWords(stringToCheck: string): string;
    function RemoveTrailingComma(stringToCheck: string): string;
    function ToLowerCase(stringToCheck: string): string;
    function Includes(stringToCheck: string, valueToCheck: string): boolean;
    function NotIncludes(stringToCheck: string, valueToCheck: string): boolean;
}
