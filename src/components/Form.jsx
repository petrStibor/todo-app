import { useEffect, useState } from "react"

export const Form = ()=> {

    const [newItem, setNewItem] = useState("")
    const [items, setItems] = useState(()=>{
        const localValue = localStorage.getItem('ITEMS')
        return JSON.parse(localValue)
    })

    // 
    useEffect(()=>{
        localStorage.setItem('ITEMS', JSON.stringify(items))
    }, [items])

    
    const addItem = ()=>{

        // Check if task isn't empty
        if (newItem === '') {
            alert("You can't add empty task!");
            return
          }

        const item = {
            id: Math.floor(Math.random() * 1000),
            value: newItem
        }
        
        // Add new item to array
        setItems(oldItems => [...oldItems, item])

        // Revert item to original state
        setNewItem("")
    }

    
    // Sort deleted items to new array
    const deleteItem = (id)=>{
        const sortedItems = items.filter((items)=> items.id !== id)
        setItems(sortedItems)
    }


    return (
        <>
            <input 
                type="text"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
            />
            <button className="btn-add" onClick={()=>addItem()}>Add task</button>
         
            <ul>
                {items.map(items=>{
                    return (
                        <li key={items.id} className="list">
                            {items.value}
                            <button onClick={()=>deleteItem(items.id)} className="btn-delete">X</button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}