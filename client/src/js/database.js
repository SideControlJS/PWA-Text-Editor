import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database', content);

  const jateDb = await openDB('jate', 1);                  // open a connection to the database
  const tx = jateDb.transaction('jate', 'readwrite');     // create a new transaction and specify the database and data privileges
  const store = tx.objectStore('jate');                  // open up the desired object store
  const request = store.put({ id: 1, value: content }); // use the .put() method to update or add new data to the database
  const result = await request;                        // confirm the request
  console.log('Data saved to the database', result.value);
};




// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');

  const jateDb = await openDB('jate', 1);             // open a connection to the database
  const tx = jateDb.transaction('jate', 'readonly'); // create a new transaction and specify the database and data privileges
  const store = tx.objectStore('jate');             // open up the desired object store
  const request = store.get(1);                    // use the .get() method to retrieve data from the database
  const result = await request;                   // confirm the request

  console.log('Data retrieved from the database', result?.value);
  
  // return the result or undefinded if no data was found
  return result?.value;
  
  
};
  
  initdb();
