export interface ContactItem {
  id: string
  name: string
  phone: string
}

// Placeholder mock data; replace with backend fetch later.
export const contacts: ContactItem[] = [
  { id: '1', name: 'Alice Johnson', phone: '+15550000001' },
  { id: '2', name: 'Bob Smith', phone: '+15550000002' },
  { id: '3', name: 'Charlie Brown', phone: '+15550000003' },
  { id: '4', name: 'Diana Prince', phone: '+15550000004' },
  { id: '5', name: 'Ethan Clark', phone: '+15550000005' },
]

export default contacts
