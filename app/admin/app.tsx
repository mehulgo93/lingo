"use client";

import { CourseEdit } from "./course/edit";
import { Admin, Resource } from "react-admin";
import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create";
import simpleRestProvider from "ra-data-simple-rest";
import { UnitList } from "./unit/list";
import { UnitCreate } from "./unit/create";
import { UnitEdit } from "./unit/edit";
import { LessonCreate } from "./lesson/create";
import { LessonEdit } from "./lesson/edit";
import { LessonList } from "./lesson/list";
import { ChallengeCreate } from "./challenge/create";
import { ChallengeEdit } from "./challenge/edit";
import { ChallengeList } from "./challenge/list";
import { ChallengeOptionList } from "./challengeOption/list";
import { ChallengeOptionCreate } from "./challengeOption/create";
import { ChallengeOptionEdit } from "./challengeOption/edit";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        recordRepresentation="title"
        create={CourseCreate}
        edit={CourseEdit}
      />
      <Resource
        name="units"
        list={UnitList}
        recordRepresentation="title"
        create={UnitCreate}
        edit={UnitEdit}
      />
      <Resource
        name="lessons"
        list={LessonList}
        recordRepresentation="title"
        create={LessonCreate}
        edit={LessonEdit}
      />
      <Resource
        name="challenges"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
        recordRepresentation="question"
      />
      <Resource
        name="challengeOptions"
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        recordRepresentation="text"
        options={{ label: "Challenge Options" }}
      />
    </Admin>
  );
};

export default App;
