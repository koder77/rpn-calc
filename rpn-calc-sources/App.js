// Copyright (C) 2022 by Stefan Pietzonke
// Released under the GPL.
//
import React from "react";
import ReactDOM from 'react-dom';
import './App.css';


let stack_ob_int = -1

let stack_reg = [256]
let stack_reg_int = -1

let stack = [4096]
let top_int = -1
let max_stack = 256
let stack_d = [4096]
let stack_ob = twoDimensionArray(256, 4096)

// test
// let infix = '{x = 23.0 + 42.0}'
let postfix
// postfix = convert(infix)
// postfix = '{x = 23 42 + 100 *'
// console.log('postfix = "', postfix, '"')
// parse_rpolish(postfix)

function twoDimensionArray(a, b) {
    let arr = []

    // creating two dimensional array
    for (let i = 0; i < a; i++) {
        for (let j = 0; j < b; j++) {
            arr[i] = []
        }
    }

    return arr
}

function push_stack(item) {
    if (stack_ob_int < max_stack - 1) {
        stack_ob[++stack_ob_int] = item.slice()
        return 0
    } else {
        console.log('error: max variable stack overflow!\n')
        return 1
    }
}

function pop_stack() {
    if (stack_ob_int > -1) {
        return stack_ob[stack_ob_int--]
    } else {
        console.log('error: no variable on stack, stack empty!\n')
        return ''
    }
}

function isOperator(symbol) {
    switch (symbol) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
        case 'S':
        case 'C':
        case 'T':
        case 's':
        case 'c':
        case 't':

        case 'A': 
        case 'B': 
        case 'D': 
        case 'E': 
        case 'F': 
        case 'G':
        case 'H':

        case 'I': 
        case 'J': 
        case 'K': 
        case 'L': 
        case 'M':
        case 'N': 
        case 'O':

        case 'q':
        case '(':
        case ')':
        case '{':
        case '}':
            return 1
            break
        default:
            return 0
    }
}

function precedence(symbol) {
    switch (symbol) {
        case '+':
        case '-':
            return 2
            break

        case '*':
        case '/':
        case '%':
            return 3
            break

        // sin, cos, tan, asin, acos, atan, sqrt...
        case 'S':
        case 'C':
        case 'T':
        case 's':
        case 'c':
        case 't':
        case 'q':
        case 'A': 
        case 'B': 
        case 'D': 
        case 'E': 
        case 'F': 
        case 'G':
        case 'H': 
        case 'I': 
        case 'J': 
        case 'K': 
        case 'L': 
        case 'M':
        case 'N': 
        case 'O':
            return 4
            break

        case '(':
        case ')':
        case '#':
            return 1
            break
    }
    return 0
}

function math_degree_to_rad (degree) {
    let rad; 
    rad = degree * Math.PI / 180.0
    return (rad)
}

function math_rad_to_degree (rad) {
    let degree;
    degree = rad * 180.0 / Math.PI
    return (degree)
}

function strip_string (string_tostrip)
{
    let i = string_tostrip.length
    let new_string_array = []
    let new_string = ""
    let maxstring = i;
    for (i = string_tostrip.length; i >= 0; i--)
    {
        if (string_tostrip.substr (i, 1) === ' ')
        {
            maxstring--
        }
        else 
        {
            break;
        }
    }
    for (i = 0; i < maxstring; i++)
    {
        new_string_array[i] = string_tostrip.substr[i]
    }
    new_string_array[i] = '\0'
    new_string_array = new_string_array.join
    new_string = new_string_array
    return (new_string)
}

function replace_symbols(linestr) {
    let run_loop = 1
    let i = 0
    let maxsymb = 27
    let symbstr = ['exp', 'asinh', 'acosh', 'atanh', 'atan2', 'sinh', 'cosh', 'tanh', 'asin', 'acos', 'atan', 'sin', 'cos', 'tan', 'Pi', 'log2e', 'log10e', 'ln2', 'ln1', 'e', 'sqrt', 'log1p', 'log10', 'log2', 'log', 'pow', 'cbrt']
    let repstr = ['O', 'A', 'B', 'D', 'E', 'F', 'G', 'H', 's', 'c', 't', 'S', 'C', 'T', '3.14159265358979323846', '1.4426950408889634074', '0.43429448190325182765', '0.69314718055994530942', '2.30258509299404568402', '2.7182818284590452354', 'q', 'K', 'J', 'L', 'I', 'M', 'N']

    let ret_string = ""

    console.log('replace_symbols: ', linestr)

    for (i = 0; i < maxsymb; i++) {
        ret_string = linestr.replaceAll (symbstr[i], repstr[i])
        linestr = ret_string
    }

    return (linestr.trim())
}

function push_double(item) {
    if (top_int < 4094) {
        stack_d[++top_int] = item
        return 0
    } else {
        return 1
    }
}

function pop_double() {
    return stack_d[top_int--]
}

function do_parse_postfix(postfix_line) {
    // let postfix_line = document.getElementById("math_input").value;
    let replaced_line = replace_symbols (postfix_line)

    parse_rpolish (replaced_line)
}

// evaluates reverse polish postfix expression
function parse_rpolish(postfix_line) {
    let i = 0
    let start = 0
    let pos = 0
    let get_var = 0
    let parse = 1
    let buf = [4096]
    let buf_join
    let buf_str
    let reg = 0
    let reg_int = 0

    let target
    let target_reg

    let math_exp_begin
    let found_op = 0

    let postfix = []
    let postfix_len

    let reg1_str
    let reg2_str
    let reg1
    let reg2

    let num
    let ret_exp
    let ch

    let pind
    let found_equal
    let found_number
    let pch

    // let postfix_line = document.getElementById("math_input").value;

    postfix_len = postfix_line.length

    math_exp_begin = 0
    start = math_exp_begin

    console.log('start = ', start)

    // copy linestr to output array
    for (i = 0; i < postfix_len; i++) {
        postfix[i] = postfix_line.substr(i, 1)
    }

    ret_exp = "error"

    i = start
    while (parse === 1) {
        ch = postfix[i]

        console.log ('char: ', i, ' = ', ch);

        // check if input is only equal sign, if yes exit parse loop
        if (postfix_len >= 2)
        {
            found_equal = 0
            found_op = 0
            found_number = 0
            for (pind = 0; pind < postfix_len; pind++)
            {
                pch = postfix[pind]
                if (pch === '=')
                {
                    found_equal = 1
                }
                else
                {
                    if (isOperator (pch) === 1)
                    {
                        found_op = 1
                    }
                    if (pch != ' ' && isOperator (pch) === 0)
                    {
                     found_number = 1
                    }
                }
            }
            if (found_equal === 1)
            {
                console.log ('op: ', found_op, ' number: ', found_number)
                if (found_op === 0)
                {
                    // no operator, only equal sign
                    // exit loop
                    ret_exp = "error"
                    return (ret_exp.toString ())
                }
                if (found_number === 0)
                {
                    // no operator, only equal sign
                    // exit loop
                    ret_exp = "error"
                    return (ret_exp.toString ())
                }
            }
        }
        else
        {
            // error, empty input line
            // break while loop
            ret_exp = "error"
            return (ret_exp.toString ())
        }

        if (i === postfix_len) {
            // end of string, end
            parse = 0
            break
        }
        if (ch !== ' ' && isOperator(ch) === 0) {
            // ch is not space or operator, get number
            pos = 0
            // printf ("ch start: '%c'\n", ch);
            get_var = 0
            while (get_var === 0) {
                // printf ("input char: '%c'\n", ch);
                if (ch === ' ' || ch === '=') {
                    // printf ("adding zero end\n");
                    buf[pos] = '\0'
                    get_var = 1
                    if (ch === '=') {
                        parse = 0
                    }
                } else {
                    if (ch === '_') {
                        buf[pos] = '-'
                    } else {
                        buf[pos] = ch
                    }
                    pos++

                    // printf ("ch var: '%c'\n", ch);
                }
                i++
                ch = postfix[i]
            }

            buf_join = buf.join('') //change array to string
            buf_str = buf_join

            console.log('push numstr: "', buf_str, '"')
            num = parseFloat(buf_str)
            if (isNaN(num) === false) {
                if (push_double(num) === 1) {
                    console.log('push_double error!')
                    return 1
                }
                console.log('push num: ', num)
            }

            i--
        } else {
            if (isOperator(ch) === 1) {
                found_op = 1

                switch (ch)
                {
                    case 'S':
                    case 'C':
                    case 'T':
                    case 's':
                    case 'c':
                    case 't':
                    case 'q':
                    case 'A':
                    case 'B':
                    case 'D':
                    case 'F':
                    case 'G':
                    case 'H':
                    case 'I':
                    case 'J':
                    case 'K':
                    case 'L':
                    case 'N':
                    case 'O':
                        // trigonometry functions, other functions, get one number from stack
                        console.log ('function call: use one number from stack')
                        reg1 = pop_double()

                        console.log('reg1: ', reg1)
                        break

                    default:
                        console.log ('function call: use two numbers from stack')

                        reg2 = pop_double()
                        reg1 = pop_double()

                        console.log('reg1: ', reg1)
                        console.log('reg2: ', reg2)
                }

                console.log('reg1: ', reg1)
                console.log('reg2: ', reg2)

                switch (ch) {
                    case '+':
                        push_double(reg1 + reg2)
                        break

                    case '-':
                        push_double(reg1 - reg2)
                        break

                    case '*':
                        push_double(reg1 * reg2)
                        break

                    case '/':
                        push_double(reg1 / reg2)
                        break

                        // sin, cos, tan
                    case 'S':
                        push_double(Math.sin (math_degree_to_rad (reg1)))
                        break

                    case 'C':
                        push_double(Math.cos (math_degree_to_rad (reg1)))
                        break

                    case 'T':
                        push_double(Math.tan (math_degree_to_rad (reg1)))
                        break

                        // asin, acos, atan
                    case 's':
                        push_double(math_rad_to_degree(Math.asin (reg1)))
                        break

                    case 'c':
                        push_double(math_rad_to_degree(Math.acos (reg1)))
                        break

                    case 't':
                        push_double(math_rad_to_degree (Math.atan (reg1)))
                        break

                    case 'q':
                        push_double(Math.sqrt (reg1))
                        break

                    case 'A':
                        push_double(Math.asinh (reg1))
                        break

                    case 'B':
                        push_double(Math.acosh (reg1))
                        break

                    case 'D':
                        push_double(Math.atanh (reg1))
                        break

                    case 'E':
                         push_double(math_rad_to_degree (Math.atan2 (reg1, reg2)))
                        break

                    case 'F':
                        push_double(Math.sinh (reg1))
                        break

                    case 'G':
                        push_double(Math.cosh (reg1))
                        break

                    case 'H':
                        push_double(Math.tanh (reg1))
                        break

                    case 'I':
                        push_double(Math.log (reg1))
                        break

                    case 'J':
                        push_double(Math.log10 (reg1))
                        break

                    case 'K':
                        push_double(Math.log1p (reg1))
                        break

                    case 'L':
                        push_double(Math.log2 (reg1))
                        break

                    case 'M':
                        push_double(Math.pow (reg1, reg2))
                        break

                    case 'N':
                        push_double(Math.cbrt (reg1))
                        break;

                    case 'O':
                        push_double(Math.exp (reg1))
                        break;

                    default:
                        console.log('ERROR: can not find operartor!')
                }
            }


        }
        i++
    }

    ret_exp = stack_d[top_int]
    console.log('exp = ', ret_exp)
    document.getElementById("math_output").innerHTML = ret_exp.toString ();

    // reset top of stack
    top_int = -1
    // return (ret_exp.toString ())
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: "10.0 Pi * ="};
  }

  render() {
    const title = <h1>RPN calculator</h1>;
    const info_text_1 = 'The input must be in the form of: example: 23 42 + =';
    const info_text_2 = 'Defined numbers: Pi, log2e, log10e, ln2, ln1, e.';
    const info_text_3 = 'Single argument functions: sqrt, cbrt, sin, cos, tan';
    const info_text_4 = 'asin, acos, atan, asinh, acosh, atanh, sinh, cosh, tanh';
    const info_text_5 = 'log, log10, log1p, log2, exp';
    const info_text_6 = 'Two argument functions: atan2 (y, x), pow (x, y)';
    const info_text_7 = 'example: 30 sin =, 2 8 pow =';
    const info_text_8 = 'For negative numbers use _ as minus sign!'
    const result = <p id="math_output"></p>;
    return (
      <><div style={{ marginTop: "1%", marginLeft: "2%", textAlign: "left" }}>
        {title} <br />
        {info_text_1} <br /> <br />
        {info_text_2} <br />
        {info_text_3} <br />
        {info_text_4} <br /> 
        {info_text_5} <br /> <br />
        {info_text_6} <br />
        {info_text_7} <br />
        {info_text_8} <br /> <br />
        <input
          value={this.state.inputText}
          style={{width: '95%'}}
          onChange={(e) => this.setState({ inputText: e.target.value })} />
        <button onClick={() => do_parse_postfix(this.state.inputText)}>calc</button>
        {result}
      </div></>
    );
  }
}



export default App;
