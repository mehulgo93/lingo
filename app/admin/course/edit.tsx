import { SimpleForm, TextInput, required, Create } from "react-admin";

export const CourseEdit = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="id" />
        <TextInput source="title" validate={[required()]} label="title" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
      </SimpleForm>
    </Create>
  );
};
