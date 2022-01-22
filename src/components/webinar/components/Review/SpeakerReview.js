import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';

import { Card, Image, Rate, Input, Button } from 'antd';

import { connect } from 'react-redux'
import axiosApi from '../../../../config/axiosConfig';
import sideNotification from '../../../../commons/sideNotification';
import serverUrl from '../../../../config/serverUrl';

const { Meta } = Card;
const { TextArea } = Input;

const SpeakerReview = props => {
    const [speakerRecord, setSpeakerRecord] = useState({})
    const [isLoading, setIsLoading] = useState({
        submit: false,
    });
    
    useEffect(() => {
        if (props.speaker_item) {
            let speaker = {
                "id": props.speaker_item.id,
                "user_id": props.user.id,
                "object_rated_id": props.speaker_item.speaker_id,
                "speaker_name": props.speaker_item.organization_name || props.speaker_item.speaker_fullname,
                "speaker_filepath": props.speaker_item.organization_name === "" ? props.speaker_item.speaker_filepath : props.speaker_item.organization_filepath,
                "reference_id": props.webinar_id,
                "rating": props.speaker_item.rating,
                "comment": props.speaker_item.comment
            }
            setSpeakerRecord(speaker);
        }
    }, []);

    const handleChangeRating = (event) => {
        setSpeakerRecord({...speakerRecord, rating: event});
    }

    const handleChangeComment = (event) => {
        setSpeakerRecord({...speakerRecord, comment: event.target.value});
    }

    const saveWebinarRating = () => {
        if (speakerRecord.rating === 0) {
            sideNotification.open("Gagal!", "Silahkan isi Penilaian terlebih dahulu.", false);
            return;
        }

        setIsLoading({...isLoading, submit: true});

        axiosApi.post(`/rating_master/save`, speakerRecord)
        .then(res => {
            var r = res.data;
            if (r.status) {
                sideNotification.open("Berhasil", "Penilaian terhadap Pembicara telah dikirim.", true);
                setSpeakerRecord({
                    ...speakerRecord,
                    id: r.data.id,
                });
                setIsLoading({...isLoading, submit: false});
            } else {
                sideNotification.open("Gagal", r.message, false);
            }
        });
    }

    const desc = ['Sangat Jelek', 'Jelek', 'Biasa', 'Baik', 'Sangat Baik'];

    return (
        <React.Fragment>
           <Card key={`speaker-${speakerRecord.id}`}
                className="mb-2"
                size='small'>
                <Meta
                    avatar={
                        <Image 
                            style={{width: "50px", height: "50px", borderRadius: "200px", border: "1px solid #ccc"}} 
                            src={serverUrl + "/" + speakerRecord.speaker_filepath}
                            shape="square"
                            preview={false}
                            onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/avatar-default.png?t=9999"}}
                        />
                    // <Avatar src="https://joeschmoe.io/api/v1/random" />
                    }
                    title={<p className='mb-0'>{speakerRecord.speaker_name}</p>}
                    description={
                        <div style={{"marginTop": "-5px"}} >
                            <p className="text-muted mb-0 mt-2">Bagaimana kualitas dari Pembicara ini?</p>
                            <Rate 
                                tooltips={desc} 
                                value={speakerRecord.rating}
                                onChange={handleChangeRating}
                                style={{"marginTop": "-30px"}}/>

                            <p className="text-muted mb-0 mt-3">Beri Ulasan untuk Pembicara ini: </p>
                            <TextArea 
                                className="mb-2"
                                value={speakerRecord.comment}
                                onChange={handleChangeComment}
                                disabled={speakerRecord.id === "" ? false : true}
                                placeholder="Tulis Ulasan"
                                rows={2} />

                            {(() => {
                                if (speakerRecord.id === "") {
                                    return (
                                        <Button type='primary' 
                                            className="text-right" 
                                            loading={isLoading.submit} 
                                            disabled={speakerRecord.id === "" ? false : true} 
                                            onClick={saveWebinarRating}>
                                            Kirim
                                        </Button>
                                    )
                                } else {
                                    return (
                                        <p className="text-muted">Penilaian telah dikunci. Terima kasih telah menberikan Penilaian.</p>
                                    )
                                }
                            })()}
                        </div>
                    }
                />
            </Card>
        </React.Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}
export default connect(mapStateToProps, null)(SpeakerReview);

