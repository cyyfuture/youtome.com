import kk from './kk.mjs';
import ru from './ru.mjs';
import zh from './zh.mjs';
import es from './es.mjs';
import ar from './ar.mjs';
import fr from './fr.mjs';
import tr from './tr.mjs';
import de from './de.mjs';
import pt from './pt.mjs';

export const locales=[
  {code:'kk',prefix:'',htmlLang:'kk',hreflang:'kk-KZ',label:'Қазақша',dict:kk,phrases:{image:name=>`${name} дизайн тұжырымдамасының көрінісі`,view:name=>`${name} үлгісін қарау`,concept:name=>`${name} — YOUTOME құрама үй тұжырымдамасы. Дизайнымен танысып, жобаңызға лайық нұсқаларды талқылаңыз.`}},
  {code:'ru',prefix:'/ru',htmlLang:'ru',hreflang:'ru-KZ',label:'Русский',dict:ru,phrases:{image:name=>`Визуализация концепции ${name}`,view:name=>`Смотреть ${name}`,concept:name=>`${name} — концепция сборного дома YOUTOME. Изучите дизайн и обсудите варианты для вашего проекта.`}},
  {code:'en',prefix:'/en',htmlLang:'en',hreflang:'en',label:'English',dict:null,phrases:null},
  {code:'zh',prefix:'/zh',htmlLang:'zh-CN',hreflang:'zh-CN',label:'中文',dict:zh,phrases:{image:name=>`${name} 设计概念效果图`,view:name=>`探索 ${name}`,concept:name=>`${name} 是 YOUTOME 预制房屋设计概念。了解外观，并讨论适合您项目的配置。`}},
  {code:'es',prefix:'/es',htmlLang:'es',hreflang:'es',label:'Español',dict:es,phrases:{image:name=>`Visualización del concepto ${name}`,view:name=>`Explorar ${name}`,concept:name=>`${name} es un concepto de vivienda prefabricada YOUTOME. Descubra el diseño y consulte las opciones para su proyecto.`}},
  {code:'ar',prefix:'/ar',htmlLang:'ar',hreflang:'ar',dir:'rtl',label:'العربية',dict:ar,phrases:{image:name=>`تصور تصميمي لمفهوم ${name}`,view:name=>`استكشف ${name}`,concept:name=>`${name} هو مفهوم لمنزل مسبق الصنع من YOUTOME. اكتشف التصميم وناقش الخيارات المناسبة لمشروعك.`}},
  {code:'fr',prefix:'/fr',htmlLang:'fr',hreflang:'fr',label:'Français',dict:fr,phrases:{image:name=>`Visualisation du concept ${name}`,view:name=>`Explorer ${name}`,concept:name=>`${name} est un concept de maison préfabriquée YOUTOME. Découvrez son design et échangez sur les options adaptées à votre projet.`}},
  {code:'tr',prefix:'/tr',htmlLang:'tr',hreflang:'tr',label:'Türkçe',dict:tr,phrases:{image:name=>`${name} konsept tasarım görseli`,view:name=>`${name} modelini keşfedin`,concept:name=>`${name}, YOUTOME'un prefabrik ev konseptidir. Tasarımı keşfedin ve projenize uygun seçenekleri görüşün.`}},
  {code:'de',prefix:'/de',htmlLang:'de',hreflang:'de',label:'Deutsch',dict:de,phrases:{image:name=>`Designvisualisierung des Konzepts ${name}`,view:name=>`${name} entdecken`,concept:name=>`${name} ist ein Fertighauskonzept von YOUTOME. Entdecken Sie das Design und besprechen Sie Optionen für Ihr Projekt.`}},
  {code:'pt',prefix:'/pt',htmlLang:'pt',hreflang:'pt',label:'Português',dict:pt,phrases:{image:name=>`Visualização do conceito ${name}`,view:name=>`Explorar ${name}`,concept:name=>`${name} é um conceito de casa pré-fabricada YOUTOME. Conheça o design e converse sobre as opções para seu projeto.`}}
];
