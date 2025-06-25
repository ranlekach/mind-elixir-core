type LangPack = {
    addChild: string;
    addParent: string;
    addSibling: string;
    removeNode: string;
    focus: string;
    cancelFocus: string;
    moveUp: string;
    moveDown: string;
    link: string;
    clickTips: string;
    summary: string;
};
/**
 * @public
 */
export type Locale = 'cn' | 'zh_CN' | 'zh_TW' | 'en' | 'ru' | 'ja' | 'pt' | 'it' | 'es' | 'fr' | 'ko';
declare const i18n: Record<Locale, LangPack>;
export default i18n;
