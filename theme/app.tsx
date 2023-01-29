/** @jsx h */
import {
  autocomplete,
  AutocompleteComponents,
} from '@algolia/autocomplete-js';

import { h, Fragment } from 'preact';

import { ProductHit } from './types';

// import { createVoiceSearchPlugin } from './voiceSearchPlugin';


import Fuse from "fuse.js/dist/fuse.basic.esm";

// import { toolsPlugin } from './toolsPlugin';
// import { predefinedItemsPlugin } from './predefinedItemsPlugin';

import * as data from './search.json';
const plantasData = data;

// import * as prdata from '../predefined_search.json';
// const predefinedData = prdata;

const fuse = new Fuse(plantasData, {
  // isCaseSensitive: false,
  // includeScore: false,
  shouldSort: true,
  includeMatches: true,
  findAllMatches: true,
  minMatchCharLength: 2,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  ignoreLocation: true,
  // ignoreFieldNorm: false,
  keys: [
    {
      name: 'nombre',
      weight: 1
    },
    {
      name: 'cientifico',
      weight: 0.8
    },
    {
      name: 'familia',
      weight: 0.4
    },
    {
      name: 'otros-nombres',
      weight: 1
    },
  ],
});


// const voiceSearchPlugin = createVoiceSearchPlugin({});



// Autocomplete init
autocomplete<ProductHit>({
  // debug: true,
  container: '#autocomplete',
  placeholder: 'Buscar',
  openOnFocus: true,
  defaultActiveItemId: 0,
  autoFocus: false,
  detachedMediaQuery: '',
  // plugins: [predefinedItemsPlugin, voiceSearchPlugin],
  translations: {
    submitButtonTitle: "Buscar",
    clearButtonTitle: "Limpiar", // defaults to 'Clear'
    detachedCancelButtonText: "Cerrar",
  },
  
  getSources({ query }) {
    if (!query) {
      return [];
    }

    return [
      {
        sourceId: 'plantasData',
        getItemUrl({ item }) {
          return item.url;
        },
        onSelect({ setIsOpen }) {
          setIsOpen(true);
        },
        getItems({ query }) {
          
          if (!query) {
            return [];
          }
          return fuse.search(query).map((plantasData) => plantasData.item);
        },

        templates: {
          header({ items }) {
            if (items.length === 0) {
              return null;
            }
            return (
              <Fragment>
                <span className="aa-SourceHeaderTitle">Plantas</span>
                <div className="aa-SourceHeaderLine" />
              </Fragment>
            );
          },
          item({ item, components }) {
            return (
              <ProductItem
                hit={item}
                components={components}
              />
            );
          },
          noResults() {
            return 'Tu búsqueda no coincide con ninguna planta de nuestra base de datos.';
          },
        },
      },
    ];
    
  },
    // Default Navigator API implementation
    navigator: {
      navigate({ itemUrl }) {
        window.location.assign(itemUrl);
      },
      navigateNewTab({ itemUrl }) {
        const windowReference = window.open(itemUrl, '_blank', 'noopener');
  
        if (windowReference) {
          windowReference.focus();
        }
      },
      navigateNewWindow({ itemUrl }) {
        window.open(itemUrl, '_blank', 'noopener');
      },
    },

});

type ProductItemProps = {
  hit: ProductHit;
  components: AutocompleteComponents;
};

function ProductItem({ hit, components }: ProductItemProps) {
  return (
    <div className="c-single-result">
      <a href={hit.url} className="aa-ItemLink" onClick={(event) => {
                  event.stopPropagation();
                }}
      >
        <div className="l-flex-container">
          <div className="aa-ItemContent">
            <div className="aa-ItemContentBody">
              <div className="aa-ItemContentTitle">
                <components.Snippet hit={hit} attribute="nombre" />
              </div>
              <div className="l-familia__wrap">
                <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0.500488" y1="-2.18557e-08" x2="0.500489" y2="10" stroke="currentColor"/>
                  <line x1="10.0005" y1="9.5" x2="0.000488238" y2="9.5" stroke="currentColor"/>
                </svg>
                <div className="o-familia-search">
                  <components.Snippet hit={hit} attribute="familia" />
                </div>
              
              </div>
            </div>
            <div className="aa-ItemContentSubtitle">
                  <components.Snippet hit={hit} attribute="cientifico" />
            </div>
            <div className="aa-ItemActions">
              <button
                className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                type="button"
                title="Select"
                style={{ pointerEvents: 'none' }}
              >
                <svg viewBox="0 0 30 27" width="30" height="27" fill="currentColor">
                <path d="M10.0611 23.8881C10.6469 24.4606 10.6469 25.389 10.0611 25.9615C9.47533 26.5341 8.52558 26.5341 7.9398 25.9615L0.441103 18.632C0.4374 18.6284 0.433715 18.6248 0.430051 18.6211C0.164338 18.3566 0.000457764 17.994 0.000457764 17.594C0.000457764 17.3952 0.0409356 17.2056 0.114276 17.0328C0.187475 16.8598 0.295983 16.6978 0.439798 16.5572L7.9398 9.22642C8.52558 8.65385 9.47533 8.65385 10.0611 9.22642C10.6469 9.79899 10.6469 10.7273 10.0611 11.2999L5.12178 16.1278H13.5005C20.9565 16.1278 27.0005 10.2202 27.0005 2.93233V1.46616C27.0005 0.656424 27.672 -1.90735e-06 28.5005 -1.90735e-06C29.3289 -1.90735e-06 30.0005 0.656424 30.0005 1.46616V2.93233C30.0005 11.8397 22.6134 19.0602 13.5005 19.0602H5.12178L10.0611 23.8881Z"/>
                </svg>
              </button>
  
            </div>
          </div>
  
  
          <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop">
              <img src={hit.imagen} alt={hit.nombre} width="40" height="40" />
          </div>
        </div>
      </a>
    </div>
    );

  
}






