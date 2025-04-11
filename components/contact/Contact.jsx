'use client'
import styled from "styled-components";
import {Col, Container, Form, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {text} from "@/styles/globalStyleVars";
import {postContact} from "@/api/contact";

const MyComponent = ({contactText, globalContact}) => {
    const {register, control, handleSubmit, formState: {errors, isSubmitSuccessful, isSubmitting}, reset} = useForm({
        mode: "all",
    })

    //--- form submit
    const success = (msg) =>
        toast.success(msg, {
            position: "top-right",
            autoClose: 4000,
            closeOnClick: true,
            progress: undefined,
        });

    const error = (msg) =>
        toast.error(msg, {
            position: "top-right",
            autoClose: 4000,
            closeOnClick: true,
            progress: undefined,
        });

    const handleFormSubmit = (e) => {
        // e.preventDefault()
        var formData = new FormData();
        formData.append('userId:', Math.floor(Math.random() * 100) + 1);
        formData.append('title', e?.title);
        formData.append('body', e?.body);
        postContact(formData)
    }


    return (
        <StyledComponent className={"contacts pb-200"}>

            <Container>
                <Row className={"contacts__form"}>

                    <Col sm={{span: 6}} className={"contacts__form__submit"}>
                        <h4>Get in Touch Today!</h4>
                        <Form onSubmit={handleFormSubmit} noValidate>
                            <Form.Group className={'form-group'}>
                                <Form.Control {...register("title", {
                                    required: {
                                        value: true,
                                        message: "Please enter title"
                                    },
                                })} type="text" placeholder="Name *"/>
                                <p className={'form-error'}>{errors.title?.message}</p>
                            </Form.Group>

                            <Form.Group className={'form-group'}>
                                <Form.Control  {...register('body', {
                                    required: {
                                        value: true,
                                        message: "Please enter a valid body data"
                                    },
                                })} type="email" placeholder="body *"/>
                                <p className={'form-error'}>{errors.body?.message}</p>
                            </Form.Group>
                            {isSubmitting ? 'Loading' : ""}
                            <button onSubmit={handleFormSubmit} type='button'>Submit</button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
    position: relative;
    overflow: hidden;

    .form-control {
        border-bottom: 1px solid ${text} !important;
        color: ${text} !important;

    }

    .bg-shadow {
        position: absolute;
        width: 100%;
        top: 0;
        height: 70%;
        object-fit: contain;
    }

    .contacts__num {
        margin-bottom: 60px;
        padding-top: 200px;

        h1 {
            font-size: 12px;
            line-height: 16px;
            color: #999999;
            margin-bottom: 15px;
        }

        a {
            font-size: 120px;
            line-height: 120px;
            color: #ffffff;
        }
    }

    .pr-40 {
        padding-right: 40px;
    }

    .contacts__address {
        h4 {
            font-size: 12px;
            line-height: 16px;
            color: #999999;
            margin-bottom: 15px;
        }

        a {
            font-size: 18px;
            line-height: 22px;
            color: #FFF;
            display: block;
            width: fit-content;
        }
    }

    .contacts__form {

        p {
            color: #ffffff;
            font-size: 18px;
            line-height: 22px;
        }

        &__submit {
            h4 {
                font-size: 32px;
                line-height: 36px;
                margin: 0 0 40px 0;
                color: #ffffff;
            }
        }
    }

    .form-group {
        position: relative;

        p {
            position: absolute;
            bottom: -20px;
            color: rgb(255 133 133 / 50%);
            font-size: 12px;
        }
    }

    @media (max-width: 1024px) {
        .contacts__num {
            padding-top: 150px;

            a {
                font-size: 100px;
                line-height: 100%;
            }
        }
    }
    @media (max-width: 991px) {
        .contacts__num {
            a {
                font-size: 48px;
                line-height: 48px;
            }
        }

        .contacts__form {
            padding-top: 120px;

            .col-sm-5, .col-sm-6 {
                min-width: 100%;
            }

            &__submit {
                margin: 120px 0 0 0;

            }
        }

    }
    @media (max-width: 600px) {
        .contacts__address {
            min-width: 100%;

            &:not(:nth-last-of-type(1)) {
                margin-bottom: 40px;
            }
        }


    }

    @media (max-width: 380px) {
        .contacts__num {
            a {
                font-size: 40px;
                line-height: 40px;
                white-space: nowrap;
            }
        }
    }
`;

export default MyComponent;
