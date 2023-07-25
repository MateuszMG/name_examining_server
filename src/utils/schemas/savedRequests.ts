import * as Yup from 'yup';

const count = Yup.number().required().min(0).max(1_000_000).label('Count');
const country_id = Yup.string().required().trim().max(3).label('Country_id');
const gender = Yup.string().required().trim().max(6).label('Gender');
const name = Yup.string().required().trim().max(100).label('Name');
const probability = Yup.number().required().min(0).max(1).label('Probability');

const limit = Yup.number().default(10).min(1).max(200).label('Limit');
const page = Yup.number().default(0).min(0).label('Page');

const genderized = Yup.object({
  count,
  gender,
  name,
  probability,
});

const nationalized = Yup.object({
  count,
  country: Yup.array()
    .of(
      Yup.object().shape({
        country_id,
        probability,
      }),
    )
    .required(),
  name,
});

/**
 * @openapi
 * components:
 *  schemas:
 *    SaveRequestInput:
 *      type: object
 *      required:
 *        - genderized
 *        - name
 *        - nationalized
 *      properties:
 *        genderized:
 *          type: object
 *          properties:
 *            count:
 *              type: number
 *              default: 123
 *            gender:
 *              type: string
 *              default: male
 *            name:
 *              type: string
 *              default: serchedName
 *            probability:
 *              type: number
 *              default: 1
 *        name:
 *          type: string
 *          default: serchedName
 *        nationalized:
 *          type: object
 *          properties:
 *            count:
 *              type: number
 *              default: 234
 *            country:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  country_id:
 *                    type: string
 *                    default: PL
 *                  probability:
 *                    type: number
 *                    default: 1
 *            name:
 *              type: string
 *              default: serchedName
 */
export const saveRequestSchema = Yup.object({
  genderized,
  name,
  nationalized,
});

/**
 * @openapi
 * components:
 *  schemas:
 *    GetSavedRequestsInput:
 *      type: object
 *      required:
 *        - limit
 *        - page
 *      properties:
 *        limit:
 *          type: number
 *          default: 10
 *        page:
 *          type: number
 *          default: 0
 *    GetSavedRequestsResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         genderized:
 *           type: object
 *           properties:
 *             count:
 *               type: number
 *             gender:
 *               type: string
 *             name:
 *               type: string
 *             probability:
 *               type: number
 *         name:
 *           type: string
 *         nationalized:
 *           type: object
 *           properties:
 *             count:
 *               type: number
 *             country:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   country_id:
 *                     type: string
 *                   probability:
 *                     type: number
 *             name:
 *               type: string
 *         savingTimes:
 *           type: array
 *           items:
 *             type: number
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
export const getSavedRequestsSchema = Yup.object({
  limit,
  page,
});
