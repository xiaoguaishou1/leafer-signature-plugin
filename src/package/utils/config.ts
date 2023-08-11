
/**
 * 配置选项接口，用于描述签名插件的各种配置参数
 */
export interface SignaturePluginOptions {
    type: string,
    config: {
        stroke?: string;                     // 画笔颜色
        strokeWidth?: number;                // 画笔粗细
        penOpacity?: number;
    }              // 画笔透明度
    //todo 配置选项
}
