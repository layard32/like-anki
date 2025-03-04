import localforage from 'localforage';

// classico file di configurazione per localforage
localforage.config({
    name: 'like-anki',
    storeName: 'data',
});

export const saveData = async (key: string, data: any) => {
    try {
        await localforage.setItem(key, data);
    } catch (error) {
        console.error('Error saving data to localforage', error);
    }
};

export const loadData = async (key: string) => {
    try {
        const data = await localforage.getItem(key);
        return data;
    } catch (error) {
        console.error('Error loading data from localforage', error);
        return null;
    }
};