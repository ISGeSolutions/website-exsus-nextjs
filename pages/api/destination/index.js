import { apiHandler, destinationRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getDestinatios
});

function getDestinatios(req, res) {
    // return users without hashed passwords in the response
    const response = destinationRepo.getAll().map(x => omit(x, 'hash'));
    return res.status(200).json(response);
}
