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

export const saveRequestSchema = Yup.object({
  genderized,
  name,
  nationalized,
});

export const getSavedRequestsSchema = Yup.object({
  limit,
  page,
});
