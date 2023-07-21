import joiLibrary from 'joi';

export const joi = joiLibrary.defaults((schema) => {
  return schema.options({
    errors: {
      wrap: {
        label: false,
      },
    },
  });
});
