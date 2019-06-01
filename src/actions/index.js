let nextActionId = 0

export const getActionObject = (type, data) => ({
  type,
  actionId: nextActionId++,
  ...data
})
