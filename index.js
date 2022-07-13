import * as page1 from './page1.js'
import * as page2 from './page2.js'
import * as page3 from './page3.js'
import * as page4 from './page4.js'

Object.defineProperty(HTMLFormElement.prototype, 'jsondata', {
    get() {
        const jsondata = {}
        const formdata = new FormData(this);
        formdata.forEach((value, key) => {
            if (!jsondata[key]) {
                jsondata[key] = formdata.getAll(key).length > 1 ? formdata.getAll(key) : formdata.get(key);
            }
        });
        return jsondata;
    }
})

Object.defineProperty(HTMLFormElement.prototype, 'urldata', {
    get() {
        const urldata = [];
        Object.entries(this.jsondata).forEach(([key, value]) => {
            urldata.push(key + '=' + (value.join ? value.join() : value))
        })
        return urldata.join('&');
    }
})


let time0=new Date().getTime();

form.addEventListener('submit',(ev)=>{
    ev.preventDefault();
    const time=window.tt-time0;
    const atime=new Date().getTime()-window.tt;
    console.log(`type=${window.type}&t=${time}&${form.urldata}`);
    try {
        axios.get(`http://49.235.219.243:5555/us/?type=${window.type}&t=${time}&at=${atime}&${form.urldata}`).then(res=>{
        if (res.data==='finish') document.querySelector('#finish').setAttribute('style','');
        else document.querySelector('#nofinish').setAttribute('style','');
    }).catch(function (error) {
    document.querySelector('#nofinish').setAttribute('style','');
  })
    } catch (error) {
        document.querySelector('#nofinish').setAttribute('style','');
    }
    

})

let a=Math.random();
let type;
if (a>0.66) {
    type='active'
}
else if (a>0.33) {
    type='passive'
}
else {type='reverse'}
// const type='passive'//reverse passive
window.type=type


let rects = document.querySelectorAll("#mainSvg rect");
// let s = "";
// let attrs = ["x", "y", "height", "width", "rx", "ry"];
// rects.forEach((r) => {
//   s += "[";
//   attrs.forEach((attr) => (s += `${r.getAttribute(attr)},`));
//   s += `'${r.style.fill}',${r.style.opacity}],`;
// });
// console.log(s);


// let t=""
var controller = new ScrollMagic.Controller();

// let tl=new TimelineMax()
// .to("#rRect",0.25,{opacity:1,ease: "power4.out"})
// .to("#rRect",0.25,{opacity:0,ease: "power4.out"})

let oldTime=0;
for (let i of [2,3,4]){
    const tw=new TweenMax.to(`#page${i}`,0.5,{opacity:1,onStart:(a,b,c)=>{
// console.log(a,b,c)
    },
onUpdate:()=>{
    const time=document.querySelector('#narration').parentNode.parentNode.scrollTop;
    if (time<oldTime && type==='reverse'){
        document.querySelector('#rRect').setAttribute('opacity',1)
    }
    // console.log('u',time,oldTime)
    oldTime=time
},
onReverseComplete:(a,b,c)=>{
    document.querySelector('#rRect').setAttribute('opacity',0)
    // console.log('r',a,b,c)
}});

    new ScrollMagic.Scene({
        // offset:300,
        triggerElement: `#p${i}n`,
        duration:(type==='passive')?300:undefined,
        // reverse:false,
    })
    .setTween(tw)
    .addTo(controller);
    
    // if (type==='reverse'){
    //     new ScrollMagic.Scene({
    //         // offset:300,
    //         triggerElement: `#p${i}n`,
    //         duration:(type==='passive')?300:undefined,
    //         // reverse:false,
    //     })
    //     .setTween(tl)
    //     .addTo(controller);
    // }

    for (let j of [1,2,3,4]){
        if (i===j) continue;
        new ScrollMagic.Scene({
            // offset:300,
            triggerElement: `#p${i}n`,
            duration:(type==='passive')?300:undefined,
            // reverse:false,
        })
        .setTween(`#page${j}`,0.5,{opacity:0})
        .addTo(controller);

    }
}




rects.forEach((r,i)=>{
    if (i<page1.a.length){
    var page=page2.a;
    var scene1=new ScrollMagic.Scene({
        // offset:300,
        triggerElement: "#p2n",
        duration:(type==='passive')?300:undefined,
        // reverse:false,
    })
    .setTween(r,0.5,{attr:{x:page[i][0],y:page[i][1],height:page[i][2],width:page[i][3],rx:page[i][4],ry:page[i][5]},fill:page[i][6],opacity:page[i][7]})
    .addTo(controller);
}
})

rects.forEach((r,i)=>{
    if (i<page1.a.length){
    var page=page3.a
    var scene1=new ScrollMagic.Scene({
        // offset:300,
        triggerElement: "#p3n",
        duration:(type==='passive')?300:undefined,
        // reverse:false,
    })
    .setTween(r,0.5,{attr:{x:page[i][0],y:page[i][1],height:page[i][2],width:page[i][3],rx:page[i][4],ry:page[i][5]},fill:page[i][6],opacity:page[i][7]})
    .addTo(controller);}
})
rects.forEach((r,i)=>{
    if (i<page1.a.length){
    var page=page4.a
    var scene1=new ScrollMagic.Scene({
        // offset:300,
        triggerElement: "#p4n",
        duration:(type==='passive')?300:undefined,
        // reverse:false,
    })
    .setTween(r,0.5,{attr:{x:page[i][0],y:page[i][1],height:page[i][2],width:page[i][3],rx:page[i][4],ry:page[i][5]},fill:page[i][6],opacity:page[i][7]})
    .addTo(controller);}
})

let texts=document.querySelectorAll('#mainSvg text');
// texts.forEach(te=>{
//     t+=`[${te.getAttribute('x')},${te.getAttribute('y')},${te.style.opacity}],`
// })


texts.forEach((r,i)=>{
    if (i<page1.b.length){
        var page=page2.b;
        var scene1=new ScrollMagic.Scene({
            // offset:300,
            triggerElement: "#p2n",
            duration:(type==='passive')?300:undefined,
            // reverse:false,
        })
        .setTween(r,0.5,{attr:{x:page[i][0],y:page[i][1]},opacity:page[i][2]})
        .addTo(controller);
    }
    
})

texts.forEach((r,i)=>{
    if (i<page1.b.length){
    var page=page3.b
    var scene1=new ScrollMagic.Scene({
        // offset:300,
        triggerElement: "#p3n",
        duration:(type==='passive')?300:undefined,
        // reverse:false,
    })
    .setTween(r,0.5,{attr:{x:page[i][0],y:page[i][1]},opacity:page[i][2]})
    .addTo(controller);}
})
texts.forEach((r,i)=>{
    if (i<page1.b.length){
    var page=page4.b
    var scene1=new ScrollMagic.Scene({
        // offset:300,
        triggerElement: "#p4n",
        duration:(type==='passive')?300:undefined,
        // reverse:false,
    })
    .setTween(r,0.5,{attr:{x:page[i][0],y:page[i][1]},opacity:page[i][2]})
    .addTo(controller);}
})

// console.log(t)
new ScrollMagic.Scene({
    // offset:300,
    triggerElement: `#p${4}n`,
    duration:(type==='passive')?300:undefined,
    // reverse:false,
})
.setTween(`#t1920`,0.5,{attr:{y:487}})
.addTo(controller);

new ScrollMagic.Scene({
    // offset:300,
    triggerElement: `#p${4}n`,
    duration:(type==='passive')?300:undefined,
    // reverse:false,
})
.setTween(`#t2010`,0.5,{attr:{y:487}})
.addTo(controller);



const submit=()=>{
    //发送结果给后端表单
    //
}
