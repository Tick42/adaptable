/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,6],$V2=[1,7],$V3=[1,8],$V4=[1,9],$V5=[1,12],$V6=[1,10],$V7=[1,11],$V8=[1,13],$V9=[4,7],$Va=[1,16],$Vb=[1,17],$Vc=[1,18],$Vd=[1,19],$Ve=[1,20],$Vf=[1,21],$Vg=[1,22],$Vh=[1,23],$Vi=[1,24],$Vj=[1,25],$Vk=[1,26],$Vl=[1,27],$Vm=[1,28],$Vn=[1,29],$Vo=[1,30],$Vp=[4,7,9,15,16,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,35],$Vq=[1,54],$Vr=[9,15,35],$Vs=[4,7,9,15,16,17,22,23,25,26,27,28,29,30,31,32,35],$Vt=[4,7,9,15,16,17,18,19,20,22,23,25,26,27,28,29,30,31,32,35],$Vu=[4,7,9,15,22,23,25,26,27,28,29,30,31,32,35],$Vv=[4,7,9,15,25,26,27,28,29,30,31,32,35];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"program":3,"EOF":4,"expressions":5,"e":6,"NEWLINE":7,"args":8,",":9,"TRUE":10,"FALSE":11,"NUMBER":12,"STRING":13,"[":14,"]":15,"+":16,"-":17,"*":18,"/":19,"%":20,"^":21,"|":22,"&":23,"!":24,"?":25,":":26,"=":27,"!=":28,"<":29,"<=":30,">":31,">=":32,"FUNCTION":33,"(":34,")":35,"$accept":0,"$end":1},
terminals_: {2:"error",4:"EOF",7:"NEWLINE",9:",",10:"TRUE",11:"FALSE",12:"NUMBER",13:"STRING",14:"[",15:"]",16:"+",17:"-",18:"*",19:"/",20:"%",21:"^",22:"|",23:"&",24:"!",25:"?",26:":",27:"=",28:"!=",29:"<",30:"<=",31:">",32:">=",33:"FUNCTION",34:"(",35:")"},
productions_: [0,[3,1],[3,2],[5,1],[5,2],[5,3],[8,1],[8,3],[6,1],[6,1],[6,1],[6,1],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,2],[6,5],[6,3],[6,3],[6,3],[6,3],[6,3],[6,3],[6,4],[6,2],[6,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return []; 
break;
case 2:
 return $$[$0-1]; 
break;
case 3: case 6:
 this.$ = [$$[$0]]; 
break;
case 4: case 12: case 31:
 this.$ = $$[$0-1]; 
break;
case 5: case 7:
 this.$ = $$[$0-2].concat([$$[$0]]); 
break;
case 8:
 this.$ = true; 
break;
case 9:
 this.$ = false; 
break;
case 10:
 this.$ = Number($$[$0]); 
break;
case 11:
 this.$ = $$[$0].slice(1, -1); 
break;
case 13:
 this.$ = yy.node('ADD', [$$[$0-2], $$[$0]], this._$); 
break;
case 14:
 this.$ = yy.node('SUB', [$$[$0-2], $$[$0]], this._$); 
break;
case 15:
 this.$ = yy.node('MUL', [$$[$0-2], $$[$0]], this._$); 
break;
case 16:
 this.$ = yy.node('DIV', [$$[$0-2], $$[$0]], this._$); 
break;
case 17:
 this.$ = yy.node('MOD', [$$[$0-2], $$[$0]], this._$); 
break;
case 18:
 this.$ = yy.node('POW', [$$[$0-2], $$[$0]], this._$); 
break;
case 19:
 this.$ = yy.node('OR', [$$[$0-2], $$[$0]], this._$); 
break;
case 20:
 this.$ = yy.node('AND', [$$[$0-2], $$[$0]], this._$); 
break;
case 21:
 this.$ = yy.node('NOT', [$$[$0]], this._$); 
break;
case 22:
 this.$ = yy.node('IF', [$$[$0-4], $$[$0-2], $$[$0]], this._$); 
break;
case 23:
 this.$ = yy.node('EQ', [$$[$0-2], $$[$0]], this._$); 
break;
case 24:
 this.$ = yy.node('NEQ', [$$[$0-2], $$[$0]], this._$); 
break;
case 25:
 this.$ = yy.node('LT', [$$[$0-2], $$[$0]], this._$); 
break;
case 26:
 this.$ = yy.node('LTE', [$$[$0-2], $$[$0]], this._$); 
break;
case 27:
 this.$ = yy.node('GT', [$$[$0-2], $$[$0]], this._$); 
break;
case 28:
 this.$ = yy.node('GTE', [$$[$0-2], $$[$0]], this._$); 
break;
case 29:
 this.$ = yy.node($$[$0-3].toUpperCase(), $$[$0-1], this._$); 
break;
case 30:
 this.$ = -$$[$0]; 
break;
}
},
table: [{3:1,4:[1,2],5:3,6:4,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{1:[3]},{1:[2,1]},{4:[1,14],7:[1,15]},o($V9,[2,3],{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh,25:$Vi,27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vp,[2,8]),o($Vp,[2,9]),o($Vp,[2,10]),o($Vp,[2,11]),{6:32,8:31,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:33,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{34:[1,34]},{6:35,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:36,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{1:[2,2]},o($V9,[2,4],{6:37,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8}),{6:38,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:39,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:40,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:41,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:42,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:43,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:44,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:45,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:46,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:47,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:48,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:49,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:50,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:51,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{6:52,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{9:$Vq,15:[1,53]},o($Vr,[2,6],{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh,25:$Vi,27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vp,[2,21]),{6:32,8:55,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},o($Vp,[2,30]),{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh,25:$Vi,27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,35:[1,56]},o($V9,[2,5],{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh,25:$Vi,27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vs,[2,13],{18:$Vc,19:$Vd,20:$Ve,21:$Vf}),o($Vs,[2,14],{18:$Vc,19:$Vd,20:$Ve,21:$Vf}),o($Vt,[2,15],{21:$Vf}),o($Vt,[2,16],{21:$Vf}),o($Vt,[2,17],{21:$Vf}),o($Vp,[2,18]),o($Vu,[2,19],{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf}),o($Vu,[2,20],{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf}),{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh,25:$Vi,26:[1,57],27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo},o($Vv,[2,23],{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh}),o($Vv,[2,24],{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh}),o($Vv,[2,25],{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh}),o($Vv,[2,26],{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh}),o($Vv,[2,27],{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh}),o($Vv,[2,28],{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh}),o($Vp,[2,12]),{6:58,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},{9:$Vq,35:[1,59]},o($Vp,[2,31]),{6:60,10:$V0,11:$V1,12:$V2,13:$V3,14:$V4,17:$V5,24:$V6,33:$V7,34:$V8},o($Vr,[2,7],{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh,25:$Vi,27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo}),o($Vp,[2,29]),o([4,7,9,15,25,26,35],[2,22],{16:$Va,17:$Vb,18:$Vc,19:$Vd,20:$Ve,21:$Vf,22:$Vg,23:$Vh,27:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo})],
defaultActions: {2:[2,1],14:[2,2]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"ranges":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

yy.node = function(type, args, location) {
  return {
    type,
    args,
    range: location.range
  }
}


var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 7;
break;
case 1:/* skip whitespace */
break;
case 2:return 12
break;
case 3:return 13
break;
case 4:return 23
break;
case 5:return 28
break;
case 6:return 32
break;
case 7:return 30
break;
case 8:return 27
break;
case 9:return 31
break;
case 10:return 29
break;
case 11:return 22
break;
case 12:return 24
break;
case 13:return 18
break;
case 14:return 19
break;
case 15:return 17
break;
case 16:return 16
break;
case 17:return 20
break;
case 18:return 21
break;
case 19:return 34
break;
case 20:return 35
break;
case 21:return 14
break;
case 22:return 15
break;
case 23:return 9
break;
case 24:return 25
break;
case 25:return 26
break;
case 26:return 10
break;
case 27:return 11
break;
case 28:return 33
break;
case 29:return 4
break;
case 30:return 'INVALID'
break;
}
},
rules: [/^(?:(\r?\n)+\s*)/,/^(?:[^\S\r?\n]+)/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:"[^"]+")/,/^(?:&|AND\b)/,/^(?:!=)/,/^(?:>=)/,/^(?:<=)/,/^(?:=)/,/^(?:>)/,/^(?:<)/,/^(?:\||OR\b)/,/^(?:!|NOT\b)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:%)/,/^(?:\^)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?:\?)/,/^(?::)/,/^(?:TRUE\b)/,/^(?:FALSE\b)/,/^(?:[a-zA-Z_]+)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}