export const userreducer = (state = { user: {}, transactions: [] }, action) => {
    switch (action.type) {
        case 'set-user':
            return {
                ...state,
                user: action.payload,
            };
        case 'ADD_TRANSACTION':
            const newTransaction = action.payload;
            const updatedUser = {
                ...state.user,
                transactions: [...state.user.transactions, newTransaction],
            };

            return {
                ...state,
                user: updatedUser,
                transactions: [...state.transactions, newTransaction],
            };

        case 'LOGOUT':
            return {
                user: {},
                transactions: [],
            };

        default:
            return state;

    };
}
