type LineItemType = 'labor' | 'material' | 'work-related';

interface BaseLineItem {
    type: LineItemType;
    description: string;
    total: number;
}

interface LaborLineItem extends BaseLineItem {
    type: 'labor';
    hourlyRate: number;
    hours: number;
}

interface MaterialOrWorkRelatedLineItem extends BaseLineItem {
    type: 'material' | 'work-related';
    price: number;
    units: number;
}

type LineItem = LaborLineItem | MaterialOrWorkRelatedLineItem;