let allPayload
export default function payReducer(state,action) {
  switch(action.type){
    case 'set':
      allPayload = action.data
      return action.data
    case 'reset':
      return allPayload
    case 'search':
      return allPayload.filter(obj => Object.values(obj).some(val =>{
        if (typeof val === 'string' || val instanceof String) return val.includes(action.key)
        return false
      }));
    default:
      return state
  }
}