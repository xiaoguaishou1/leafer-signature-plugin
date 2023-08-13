/*
 * @Author: panghu 760695955@qq.com
 * @Date: 2023-08-10 18:14:29
 * @LastEditors: panghu 760695955@qq.com
 * @LastEditTime: 2023-08-13 17:50:06
 * @FilePath: /leafer-board-plugin/src/package/utils/pen.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ILeafer, Pen, PointerEvent } from 'leafer-ui';
import { SignaturePluginOptions } from './config';


/**
 * @description: 画板
 * @param {*}
 * @return {*}
 */


export class SignatureBorad {
    private pen: Pen;
    private isDrawing: boolean;
    private canvas: ILeafer;
    config: SignaturePluginOptions;
    constructor(canvas: ILeafer, config: SignaturePluginOptions) {
        this.isDrawing = false;
        this.config = config;
        this.canvas = canvas;
        this.pen = new Pen();
        this.canvas.add(this.pen);
        this.startDrawing();
        this.continueDrawing();
        this.stopDrawing();
    }

    /**
     * Starts the drawing process.
     *
     * @private
     */
    private startDrawing() {
        this.canvas.on(PointerEvent.DOWN, (event: PointerEvent) => {
            this.isDrawing = true;
            this.pen.setStyle({
                stroke: this.config.config.stroke ? this.config.config.stroke : 'red',
                strokeWidth: this.config.config.strokeWidth ? this.config.config.strokeWidth : 2,
                opacity: this.config.config.penOpacity ? this.config.config.penOpacity : 1,
            });
            this.pen.moveTo(event.x, event.y);
        });
    }

    /**
     * Continues the drawing process.
     *
     * @param {PointerEvent} event - The pointer event object.
     * @return {void} This function does not return anything.
     */
    private continueDrawing() {
        this.canvas.on(PointerEvent.MOVE, (event: PointerEvent) => {
            if (this.isDrawing) {
                this.pen.lineTo(event.x, event.y);
                this.pen.paint();
            }
        });
    }

    /**
     * Stops the drawing process when the pointer is released.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    private stopDrawing() {
        this.canvas.on(PointerEvent.UP, () => {
            this.isDrawing = false;
        });
    }

    /**
     * Clears the signature canvas.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    public clearSignature() {
        this.pen.removeAll();
    }



    /**
     * Downloads an image by exporting the signature as a PNG file.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    public downLoadImg() {
        this.pen.export('signature.png');
    }

    /**
     * Converts the current data to a file format.
     *
     * @return {Promise} A promise that resolves with the data of the file.
     */
    public toFile() {
        return new Promise((resolve, reject) => {
            this.pen.export('png', true).then(result => {
                console.log(result)
                resolve(result.data)
            }).catch(err => {
                reject(err)
            })
        })
    }


    /**
     * Converts the image to base64 format.
     *
     * @param {number} quality - The quality of the image. Optional.
     * @return {Promise<string>} A promise that resolves to the base64 representation of the image.
     */
    public toBase64(quality?: number) {
        return new Promise((resolve, reject) => {
            this.pen.export('jpg', quality).then(result => {
                resolve(result.data)
            }).catch(err => {
                reject(err)
            })
        })
    }


    /**
     * Undoes the last stroke in the signature.
     *
     * @return {void} No return value.
     */
    public undo(): void {
        this.pen.children.pop();
        this.canvas.forceFullRender()
    }
}