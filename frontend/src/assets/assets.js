import add_icon from './add_icon.svg'
import admin_logo from './admin_logo.png'
import appointment_icon from './appointment_icon.svg'
import cancel_icon from './cancel_icon.svg'
import doctor_icon from './doctor_icon.svg'
import home_icon from './home_icon.svg'
import people_icon from './people_icon.svg'
import upload_area from './upload_area.svg'
import list_icon from './list_icon.svg'
import tick_icon from './tick_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import patients_icon from './patients_icon.svg'

import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.png'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'

import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'

import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'

export const assets = {
    add_icon,
    admin_logo,
    appointment_icon,
    cancel_icon,
    doctor_icon,
    upload_area,
    home_icon,
    patients_icon,
    people_icon,
    list_icon,
    tick_icon,
    appointments_icon,
    earning_icon,        

    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Sankalp Malhotra',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Malhotra focuses on holistic patient care, emphasizing preventive medicine, accurate diagnosis, and personalized treatment plans.',
        fees: 50,
        address: {
            line1: '12th Avenue, Green Park',
            line2: 'Sector 5, New Delhi'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Supriya Reddy',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Reddy is dedicated to women’s health, offering preventive screenings, early intervention, and compassionate care.',
        fees: 60,
        address: {
            line1: '44th Lane, Maple Street',
            line2: 'Downtown, New York'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Satish Kapoor',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Kapoor specializes in skin health and aesthetic dermatology, focusing on early detection and effective treatment solutions.',
        fees: 30,
        address: {
            line1: '78th Cross, Orchid Road',
            line2: 'Sector 14, Mumbai'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Ethan Brooks',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Brooks provides child-centric care, emphasizing preventive pediatrics, vaccination, and growth monitoring.',
        fees: 40,
        address: {
            line1: '9th Street, Willow Avenue',
            line2: 'Block C, Chicago'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Olivia Turner',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '7 Years',
        about: 'Dr. Turner is committed to neurological wellness, focusing on early detection of disorders and advanced treatment strategies.',
        fees: 50,
        address: {
            line1: '56th Cross, Lakeview Road',
            line2: 'Sector 9, Sydney'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Harish Menon',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Menon provides comprehensive care for neurological conditions, emphasizing personalized treatment and preventive care.',
        fees: 50,
        address: {
            line1: '22nd Avenue, Sunrise Colony',
            line2: 'Kochi, Kerala'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Samuel Carter',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Carter delivers patient-focused general care with an emphasis on preventive strategies and early diagnosis.',
        fees: 50,
        address: {
            line1: '16th Boulevard, Aspen Street',
            line2: 'Phoenix, Arizona'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Kalyan Singhal',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Singhal is passionate about women’s health, offering preventive care, counseling, and effective treatment options.',
        fees: 60,
        address: {
            line1: '33rd Road, Blossom Lane',
            line2: 'Whitefield, Bengaluru'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Isabella Hayes',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Hayes focuses on dermatology and skincare, providing early diagnosis and customized treatment solutions.',
        fees: 30,
        address: {
            line1: '88th Cross, Palm Street',
            line2: 'Manchester, UK'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Lucas Bennett',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Bennett provides preventive and pediatric care, ensuring proper growth and early intervention when needed.',
        fees: 40,
        address: {
            line1: '25th Street, Cherry Blossom Road',
            line2: 'Toronto, Canada'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Kavya Nair',
        image: doc11,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Nair emphasizes neurological health with preventive care, early diagnosis, and personalized treatment plans.',
        fees: 50,
        address: {
            line1: '14th Cross, Lotus Enclave',
            line2: 'Trivandrum, Kerala'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Daniel Foster',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Foster provides expert care in neurological disorders, focusing on patient safety, early intervention, and holistic treatment.',
        fees: 50,
        address: {
            line1: '61st Street, Ocean Drive',
            line2: 'San Diego, California'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Grace Thompson',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Thompson delivers comprehensive general care with focus on preventive health, diagnostics, and patient education.',
        fees: 50,
        address: {
            line1: '10th Avenue, Hilltop Street',
            line2: 'Bristol, UK'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Vikram Shah',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Shah provides specialized gynecological care, focusing on preventive screenings, counseling, and effective treatment.',
        fees: 60,
        address: {
            line1: '42nd Cross, Jasmine Road',
            line2: 'Ahmedabad, Gujarat'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Ananda Krishnan',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Krishnan specializes in skin care and dermatology, offering early detection, treatment, and patient-focused guidance.',
        fees: 30,
        address: {
            line1: '63rd Cross, Riverside Lane',
            line2: 'Chennai, Tamil Nadu'
        }
    }
]
