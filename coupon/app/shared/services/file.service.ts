import fs from 'fs';

export class FileService {
    public async read(path: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, async (err, data) => {
                if (err)
                    return reject(err);
                resolve(data);
            });
        });
    }

    public async delete(path: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err) return reject(err);
                resolve(true);
            });
        });
    }
}
export default new FileService();