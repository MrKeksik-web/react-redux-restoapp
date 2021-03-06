const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    total: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                loading: true,
            };
        case 'MENU_ERROR':
            return {
                ...state,
                loading: false,
                error: true,
                menu: action.payload,
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const item = state.menu.find(item => item.id == id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
            }
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem,
                ],
                total: state.total + newItem.price,
            };
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id == idx);
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1),
                ],
                total: state.total - state.items[itemIndex].price,
            };
        default:
            return state;
    }
}

export default reducer;