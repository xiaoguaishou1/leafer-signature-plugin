
/*
 * @Author: panghu 760695955@qq.com
 * @Date: 2023-08-10 17:17:16
 * @LastEditors: panghu 760695955@qq.com
 * @LastEditTime: 2023-08-11 21:00:34
 * @FilePath: /leafer-board-plugin/src/package/lib/plugin.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ILeafer, IObject, IPlugin } from '@leafer-ui/interface';
import { SignaturePluginOptions } from '../utils/config';
import { SignatureBorad } from '../utils/pen';

interface Cstom extends IPlugin {
    borad: SignatureBorad,
}

// 插件定义
export const Signature: Cstom = {
    importVersion: '1.0.0-beta.8',
    import: ['LeaferTypeCreator'],
    config: {} as SignaturePluginOptions,
    LeaferUI: {},
    borad: {} as SignatureBorad,
    /**
     * A description of the entire function.
     *
     * @param {IObject} LeaferUI - description of parameter
     * @param {Iconfig} config - description of parameter
     * @return {void} description of return value
     */
    run(LeaferUI: IObject, config: SignaturePluginOptions) {
        this.config = config;
        this.LeaferUI = LeaferUI;
        console.log('run', LeaferUI)
    },
    /**
     * Asynchronously handles the "onLeafer" event.
     *
     * @param {ILeafer} leafer - The leafer object.
     * @return {void} - A promise that resolves when the function completes.
     */
    onLeafer(leafer: ILeafer): void {
        console.log(leafer, 'onLeafer')
        this.borad = new SignatureBorad(leafer, this.config);
    },

    undo() {
        this.borad.undo()
    },
    clear() {
        this.borad.clearSignature()
    },
    downLoadImg() {
        this.borad.downLoadImg()
    },
    toBase64() {
        this.borad.toBase64()
    },
    toFile() {
        this.borad.toFile()
    }
}

