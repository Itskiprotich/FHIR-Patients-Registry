interface Meta {
    versionId: string;
    lastUpdated: string;
    source: string;
    profile: string[];
}
interface Texts {
    status: string;
    div: string;
}
interface ValueCoding {
    system: string;
    code: string;
    display: string;
}
interface ValueAddress {
    city: string;
    state: string;
    country: string;
}
interface InnerExtension {
    url: string;
    valueCoding: ValueCoding;
    valueString: string | null;
}
interface Extension {
    url: string;
    extension: InnerExtension[];
    valueString: string | null;
    valueCode: string | null;
    valueAddress: ValueAddress | null
    valueDecimal: string | null;
}
interface Name {
    use: string | null;
    family: string;
    given: string[];
}
interface Telecom {
    system: string
    value: string
    use: string | null;
}
interface Address {
    city: string;
    state: string | null;
    country: string;
}
interface Resource {
    resourceType: string;
    id: string;
    // meta: Meta;
    // text: Texts;
    //  extension: Extension[] | null;
    active: boolean;
    name: Name[];
    telecom: Telecom[];
    gender: string;
    birthDate: string;
    address: Address[];

}
interface Search {
    mode: string;
}
export interface Patient {
    fullUrl: string;
    resource: Resource;
    search: Search;
}


export const INITIAL_PATIENT: Patient = {
    fullUrl: '',
    resource: {
        resourceType: 'Patient',
        id: '',
        active: true,
        name: [
            {
                use: '',
                family: '',
                given: []

            }
        ],
        telecom: [
            {
                system: '',
                value: '',
                use: '',
            }
        ],
        gender: '',
        birthDate: '',
        address: [
            {
                city: 'IMEJACITY',
                state: '',
                country: ''
            }
        ]
    },
    search: {
        mode: ''
    }
}
