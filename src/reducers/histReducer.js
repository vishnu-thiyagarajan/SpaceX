let allHistory
export default function histReducer(state,action) {
  switch(action.type){
    case 'set':
      allHistory = action.data
      return action.data
    case 'reset':
      return allHistory
    case 'search':
      return allHistory.filter(obj => Object.values(obj).some(val =>{
        if (typeof val === 'string' || val instanceof String) return val.includes(action.key)
        return false
      }));
    default:
      return state
  }
}