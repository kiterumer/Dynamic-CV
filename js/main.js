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
    },30)
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
*面试官你好呀，我是尹洋洋，来应聘贵公司的前端职位
*我来做下自我介绍^_^
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

- 我叫尹洋洋,
1995年10月出生,来自湖北孝感。
2018年7月郑州大学本科毕业,
专业学的地理信息科学。
- 自学的前端，之前在一家小公司打过几个月杂，写写静态页面，调下后台接口。

## 技能介绍

- 熟悉HTML5,CSS3,JavaScript,Ajax,ES6;
- 熟悉Vue框架，理解组件之间通信，响应式原理;了解一点React,近期在学；
- 熟悉HTTP相关计算机网络知识;了解一些Web性能优化方案；
- 了解Webpack,Canvas,Git

## 项目介绍
1. [博客发布分享平台](https://kiterumer.github.io/share-blog-preview/)
2. [自制Vue UI框架](https://kiterumer.github.io/Vue-UI/)
3. [Canvas 画板](https://kiterumer.github.io/canvas-demo/)
4. [键盘侠导航](https://kiterumer.github.io/nav-demo/)

## 联系方式

- Tel: 18203677022
- Wechat: 18203677022
- Email: yin_yangyang@foxmail.com
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