import { generateTrackings, getNumberOfTrackingsUnassigned } from '../../repository.js';
import { Router } from 'express';

const routerGenerateTrackings = Router();

routerGenerateTrackings.post('/generate-trackings', (req, res) => {
    let desiredNumberGenerateTrackingsIds = 200;

    getNumberOfTrackingsUnassigned().then(number => {
        const numTrackingsUnassigned = number.rows[0].count;

        if (numTrackingsUnassigned <= 200) {
            const numberToGenerate =
                (desiredNumberGenerateTrackingsIds - numTrackingsUnassigned);

            desiredNumberGenerateTrackingsIds = numberToGenerate;
        } else {
            desiredNumberGenerateTrackingsIds = 0;
        }

        return desiredNumberGenerateTrackingsIds;
    }).then(() =>

        // TODO: Verificar se o UUID gerado já não existe no banco.

        // TODO: Passar transaction para fora da Repository
        // Exemplo:
        // try {
        //      repository.beginTransaction()
        //      for (numberOf) {
        //          // VERIFICA SE O UUID JÁ EXISTE NO BANCO
        //          repository.generateTrackings(uuid)
        //      }
        //      repository.commitTransaction()
        // } catch (error) {
        //      repository.rollbackTransaction()
        // }

        generateTrackings(desiredNumberGenerateTrackingsIds).then(() =>
                res.send(`Trackings generated`))
    ).catch(console.log);
});

export default routerGenerateTrackings;
