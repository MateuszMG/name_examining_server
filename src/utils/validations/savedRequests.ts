import * as Yup from 'yup';

const yupSchemas = {
  count: Yup.number().required().max(0).max(1_000_000).label('Count'),
  country_id: Yup.string().required().trim().max(3).label('Country_id'),
  gender: Yup.string().required().trim().max(6).label('Gender'),
  name: Yup.string().required().trim().max(100).label('Name'),
  probability: Yup.number().required().max(0).max(1).label('Probability'),

  limit: Yup.number().default(10).min(1).max(200).label('Limit'),
  page: Yup.number().default(0).min(0).label('Page'),
};

const { count, country_id, gender, limit, name, page, probability } =
  yupSchemas;

const saveRequestSchema = Yup.object({
  genderized: Yup.object({
    count,
    gender,
    name,
    probability,
  }),
  name,
  nationalized: Yup.object({
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
  }),
});

const getSavedRequestsSchema = Yup.object({
  limit,
  page,
});

export { getSavedRequestsSchema, saveRequestSchema };
