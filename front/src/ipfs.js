import { create } from 'ipfs-http-client';

const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'http' });

export default ipfs;