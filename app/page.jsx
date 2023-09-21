"use client"

import { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable, SortableContext, verticalListSortingStrategy, rectSortingStrategy ,arrayMove } from '@dnd-kit/sortable';
import {DragDropContext} from 'react-beautiful-dnd'
import {CSS} from '@dnd-kit/utilities'
import { SignOutButton } from "@clerk/nextjs";
import Image from 'next/image';


// components
import {Data} from './components/data'
import { SearchBar } from "./components/Searchbar";



export default function Home() {
  const [users, setUsers] = useState(Data);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState();

  const handleSearch = () => {
    const filteredResults = Data.filter((item) => {
        const title = item.title.toLowerCase();
        const includesTerm = title.includes(searchTerm.toLowerCase());
        return includesTerm;
    });
    setSearchResults(filteredResults);
};

// UseEffect hook to reset search results when searchTerm becomes empty
useEffect(() => {
  if (!searchTerm) {
    setSearchResults([]); 
  }
}, [searchTerm]);

  const onDragEnd = (event) => {
    const {active, over} = event;
    if(active.id === over.id){
      return
    }
    setUsers(() => {
      const oldIndex = users.findIndex((user) => user.id === active.id )
      const newIndex = users.findIndex((user) => user.id === over.id )
      return arrayMove(users, oldIndex, newIndex)
    });
  };

  const SortableUser = ({user}) => {
    const {
      attributes,
      listeners, 
      setNodeRef, 
      transform, 
      transition, 
    } = useSortable({id: user.id});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return(
        <>
          <div 
            ref={setNodeRef} 
            style={style} 
            {...attributes} 
            {...listeners} 
            className="transition duration-500 ease-in-out touch-none rounded-lg relative overflow-hidden "
            >
            
              <Image
                src={user.url}
                alt={user.title}
                width={300}
                height={300}
                className=" hover:scale-110 transition-all"
              />
              
              <div className="absolute bottom-0 left-0 bg-gray-500/50 px-4 py-2 backdrop-blur-sm text-white text-lg w-full ">
                <h1>{user.title || <Skeleton count={5}/>}</h1>
              </div>
            </div>

        </>
    )
  }

  return (
    <>
          <main>
            <header className="flex flex-wrap items-center md:flex-row justify-between px-8 py-3 md:p-12 gap-2 ">
              <h1 className=" text-[1.5rem] md:text-[2rem] order-1 " >Image-Flow</h1>

              <div className="order-3 lg:order-2">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch}/>
              </div>

              <div className="order-2 lg:order-3" >
                <SignOutButton >
                  <button type="button" className="text-black hover:text-white border border-gray-800 hover:bg-gray-900 lg:rounded-lg px-5 py-1 lg:py-3 text-center  ">Sign-Out</button>
                </SignOutButton>
              </div>

            </header>

            <div className=' pb-8 '>
              <div className = 'flex flex-wrap gap-2 justify-center touch-none ' >
                <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                  <SortableContext items={users} strategy={rectSortingStrategy}>
                    { searchResults && searchResults.length > 0 ? (searchResults.map((user) => (
                        <div 
                          className=" transition duration-500 ease-in-out touch-none rounded-lg relative overflow-hidden "
                          >
                            <Image
                              src={user.url}
                              width={300}
                              height={300}
                              className=" hover:scale-110 transition-all"
                            />
                            <div className="absolute bottom-0 left-0 bg-gray-500/50 px-4 py-2 backdrop-blur-sm text-white text-lg w-full ">
                              <h1>{user.title}</h1>
                            </div>
                          </div>
                    ))) :  
                      users?.map((user) => (
                        <SortableUser key={user.id} user={user} />
                      ))
                    }
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </main>
    </>
  )
}
