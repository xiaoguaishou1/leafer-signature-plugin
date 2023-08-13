/*
 * @Author: panghu 760695955@qq.com
 * @Date: 2023-08-10 13:28:49
 * @LastEditors: panghu 760695955@qq.com
 * @LastEditTime: 2023-08-13 17:55:28
 * @FilePath: /leafer-board-plugin/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE;
 */
import { Leafer, usePlugin } from 'leafer-ui';
//@ts-ignore
import { Signature } from 'leaferSignaturePlugin'
console.log(Signature, '1');

usePlugin(Signature, {
    type: "pen",
    config: {
        stroke: 'red',
        strokeWidth: 2
    }
});

new Leafer({
    view: 'board',
    width: 400,
    height: 300,
    fill: "black"
});


document.getElementById('undo')?.addEventListener('click', () => {
    Signature.borad.undo()
})

document.getElementById('clear')?.addEventListener('click', () => {
    Signature.borad.clearSignature()
})

document.getElementById('sava')?.addEventListener('click', () => {
    Signature.borad.toBase64().then((res: any) => {
        console.log(res)
    })
})

document.getElementById('download')?.addEventListener('click', () => {
    Signature.borad.downLoadImg();
})

document.getElementById('toggle')?.addEventListener('click', () => {
    Signature.borad.toFile().then((res: any) => {
        console.log(res)
    })
})



