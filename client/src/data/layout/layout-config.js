import { Link } from 'react-router-dom';

import {
    Button,
    Tag
} from 'antd';

import {
    BookOutlined,
    SettingOutlined,
    DeleteOutlined,
    EditOutlined,
    BarChartOutlined,
    GlobalOutlined,
    AppstoreOutlined
} from "@ant-design/icons";

export const data = {
    sidebar: {
        theme: "light",
        mode: "inline",
        style: {
            height: '100%'
        },
        menu: [
            {
                id: 1,
                icon: <BarChartOutlined />,
                title: "Dashboard",
                href: "dashboard",
            },
            {
                id: 2,
                title: "Employee",
                href: "employee",
            },
            {
                id: 3,
                title: "Customers",
                href: "customer",
            },
            {
                id: 4,
                icon: <BookOutlined />,
                title: "Books",
                href: "books",
            },
            {
                id: 5,
                icon: <GlobalOutlined />,
                title: "Location",
                subMenu: [
                    {   
                        id: 100,
                        title: "Countries",
                        href: "location/country"
                    },
                    {
                        id: 101,
                        title: "Cities",
                        href: "location/city"
                    }
                ]
            },
            {
              id: 7,
              icon: <AppstoreOutlined />,
              title: "Others",
              subMenu: [
                  {   
                      id: 200,
                      title: "Authors",
                      href: "other/author"
                  },
                  {
                      id: 201,
                      title: "Transilator",
                      href: "other/transilator"
                  },
                  {
                      id: 202,
                      title: "Publisher",
                      href: "other/publisher"
                  },
                  {
                      id: 203,
                      title: "Category",
                      href: "other/category"
                  },
                  {
                      id: 204,
                      title: "Unit",
                      href: "other/unit"
                  }
              ]
          },
            {
                id: 8,
                icon: <SettingOutlined />,
                title: "Settings",
                href: "setting",
            }
        ]
    },
    employeeTable: [
        {
            title: 'ID CARD',
            dataIndex: 'id_card',
            key: 'id_card'
          },
          {
            title: 'Firstname',
            dataIndex: 'first_name',
            key: 'first_name'
          },
          {
            title: 'Lastname',
            dataIndex: 'last_name',
            key: 'last_name',
          },
          {
            title: 'Fathername',
            dataIndex: 'father_name',
            key: 'father_name',
          },
          {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
          },
          {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
            render: d => d.split("T")[0]
          },
          {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: g => {
                if(g === "M") return <span>Male</span>
                if(g === "F") return <span>Female</span>
                return <span>Other</span>
            }
          },
          {
            title: 'Email Address',
            dataIndex: 'email',
            key: 'email',
            render: mail => <a href={`mailto:${mail}`}>{mail}</a>
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: phone => <a href={`tel:${'+93' + phone}`}>{"+93" + phone}</a>

          },
          {
            title: 'Is Active',
            dataIndex: 'is_active',
            key: 'is_active',
            render: act =>{
                let color = act === true ? 'green' : 'red';
                return <Tag color={color}>{act === true ? "Actived" : "Not Active"}</Tag>
            } 
          },
          {
            title: 'Action',
            dataIndex: '',
            key: '',
            render: (data) => {
                return (
                    <>
                    <Button type='link' danger icon={<DeleteOutlined />} />
                    <Link to={`/ara-dev/employee/edit/${data._id}`}><Button type='link' primary  icon={<EditOutlined />} /></Link>
                    </>
                )
            }
          }
    ],
    customerTable: [
      {
        title: 'ID CARD',
        dataIndex: 'id_card',
        key: 'id_card'
      },
      {
        title: 'Firstname',
        dataIndex: 'first_name',
        key: 'first_name'
      },
      {
        title: 'Lastname',
        dataIndex: 'last_name',
        key: 'last_name',
      },
      {
        title: 'Email Address',
        dataIndex: 'email',
        key: 'email',
        render: mail => <a href={`mailto:${mail}`}>{mail}</a>
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        render: phone => <a href={`tel:${'+93' + phone}`}>{"+93" + phone}</a>

      },
      {
        title: 'Is Active',
        dataIndex: 'is_active',
        key: 'is_active',
        render: act =>{
            let color = act === true ? 'green' : 'red';
            return <Tag color={color}>{act === true ? "Actived" : "Not Active"}</Tag>
        } 
      }
    ],
    cityTable: [
      {
        title: 'ID CARD',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        render: c => c.name
      },
      {
        title: 'Language',
        dataIndex: 'country',
        key: 'country',
        render: l => l.lang.map(i => <span>{i}, </span>)
      }
    ],
    countryTable: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Language',
        dataIndex: 'lang',
        key: 'lang',
        render: (c) => c.join(", ")
      },
      {
        title: 'Country Code',
        dataIndex: 'code',
        key: 'code',
        render: code => <span>+ {code}</span>
      },
      {
        title: 'Total Cities',
        dataIndex: 'cities',
        key: 'cities',
        render: city => city.length
      }
    ],
    authorTable: [
      {
        title: 'Firstname',
        dataIndex: 'first_name',
        key: 'first_name'
      },
      {
        title: 'Lastname',
        dataIndex: 'last_name',
        key: 'last_name'
      },
      {
        title: 'img',
        dataIndex: 'img',
        key: 'img'
      },
      {
        title: 'Description',
        dataIndex: 'about',
        key: 'about'
      },
      {
        title: 'Form',
        dataIndex: 'country',
        key: 'country',
        render: c => <Tag color='cyan'>{c.name}</Tag>
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: e => <a href={`mailto:${e}`} >{e}</a>
      },
      {
        title: 'Website',
        dataIndex: 'website',
        key: 'website',
        render: w => <a href={w}>{w}</a>
      }
    ],
    publisherTable: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: e => <a href={`mailto:${e}`} >{e}</a>
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        render: p => <a href={`tel:${p}`} >{p}</a>
      },
      {
        title: 'Website',
        dataIndex: 'website',
        key: 'website',
        render: w => <a href={w}>{w}</a>
      },
      {
        title: 'Address',
        dataIndex: 'addresses',
        key: 'addresses',
        render: address => address.map((item, i) => (
          <span>{item.street + ", " + item.street2 + ", " + item.city.name + ", " + item.country.name}</span>
        ))
      }
    ],
    unitTable: [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'Currency Code',
        dataIndex: 'code',
        key: 'code'
      },
      {
        title: 'Symbol',
        dataIndex: 'symbol',
        key: 'symbol'
      }
    ],
    transilatorTable: [
      {
        title: 'Firstname',
        dataIndex: 'first_name',
        key: 'first_name'
      },
      {
        title: 'Lastname',
        dataIndex: 'last_name',
        key: 'last_name'
      },
      {
        title: 'Describtion',
        dataIndex: 'about',
        key: 'about'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: e => <a href={`mailto:${e}`} >{e}</a>
      },
      {
        title: 'Website',
        dataIndex: 'website',
        key: 'website',
        render: w => <a href={w}>{w}</a>
      },
      {
        title: 'Profile Picture',
        dataIndex: 'img',
        key: 'img'
      }
    ],
    categoryTable: [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
      },
    ]
}

