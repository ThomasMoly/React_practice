import { Client, Databases, Query, ID } from "appwrite";


const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const BOOK_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_B_ID

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')    // Your API Endpoint
    .setProject(PROJECT_ID)                // Your project ID
;

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, book) =>{
    //1. use Appwire SDK to check if the search term exisst in the database
    try{
        const result = await database.listDocuments(DATABASE_ID, BOOK_COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)
        ])

        console.log(result.documents)

    //2. if it does, update the count
        if(result.documents.length > 0){
            const doc = result.documents[0]
    
        await database.updateDocument(DATABASE_ID, BOOK_COLLECTION_ID, doc.$id, {
            count: doc.count + 1,
        })
            //3. if it doens't create a new docoument with the search term and count as 1
    } else {
        await database.createDocument(DATABASE_ID, BOOK_COLLECTION_ID, ID.unique(), {
            searchTerm,
            count: 1, 
            book_id: book.id,
            poster_URL: book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : 'no-movie.png'
        })
    }

    }catch (error){
        console.error(error)
    }
}

export const getTrendingBooks = async() =>{
    try {
        const result = await database.listDocuments(DATABASE_ID, BOOK_COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ])
        return result
    } catch (error) {
        console.log(error)
    }
}