import { Hit } from '@algolia/client-search';

type ProductRecord = {
  nombre: string;
  cientifico: string;
  slug: string;
  imagen: string;
  url: string;
  familia: string;
};


export type ProductHit = Hit<ProductRecord>;
