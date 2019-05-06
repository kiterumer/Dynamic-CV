function writeCss(prefix,code,fn){
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n),Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0,n)
        domCode.scrollTop = domCode.scrollHeight
        if(n >= code.length){
            window.clearInterval(id)
            fn && fn.call()
        }
    },70)
}

function writeMarkdown(markdown,fn){
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0,n)
        domPaper.scrollTop = domPaper.scrollHeight
        if(n >= markdown.length){
            window.clearInterval(id)
            fn && fn.call()
        }
    },35)
}

var css1 = `
/*
*面试官你好，我是尹洋洋
*我来做下自我介绍
*首先准备一些样式 
*/

*{
    transition:all 1s;
}
html{
    background:#eee;
}
#code{
    border:1px solid #aaa;
    padding:16px;
}
/* 我需要一点代码高亮 */

.token.selector{color:#690;}
.token.property{color:#905;}

/* 加点阴影 */

#code{
    box-shadow: 0 0 3px rgba(0,0,0,.4);
}

/* 现在正是开始咯 */

/* 我需要一张白纸 */

#code-wrapper{
    width:50%;left:0;position:fixed;
    height:100%;
}

#paper > .content{
    display:block;
}

/* 于是我就可以在白纸上写字了，请看右边 */
`

var css2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 markdown 变成 html
 */
`

var md = `
## 自我介绍

我叫尹洋洋,
1995年10月出生,
2018年7月郑州大学本科毕业,
专业是地理信息科学

## 技能介绍

熟悉 HTML,CSS,JavaScript,Ajax,ES6;
熟悉 Vue框架;
熟悉 HTTP;
了解 Webpack,Canvas,Git

## 项目介绍
1. 博客发布分享平台 (Vue)
2. 自制Vue UI框架
3. Canvas 画板

## 联系方式

- Tel 18203677022
- Wechat 18203677022
- Email 1404646092@qq.com
`

var css3 = `
/*
* That's all
* Thanks for watching
*/
`

writeCss('',css1,()=>{
    createPaper(()=>{
        writeMarkdown(md,()=>{
            writeCss(css1,css2,()=>{
                convertMarkdownToHtml(()=>{
                    writeCss(css1 + css2,css3,()=>{
                        console.log('finish')
                    })
                })
            })
        })
    })
})

function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
}

function convertMarkdownToHtml(fn){
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
}