"use client"

import { Box, CardActionArea, Skeleton, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import Image from "next/image";

function banner() {
    const isMobile = useMediaQuery("(max-width: 500px)");

    const [loading, setLoading] = useState(true);

    const [bannerList, setBannerList] = useState([]);
    const getBannerList = async () => {
        const response = await axios.get(
            "https://jakartasatu.jakarta.go.id/apimobile/app/v3/banners"
        );
        setBannerList(response.data.data);
        setLoading(false);
        // console.log(response.data);
    };

    const [carouselHeight, setCarouselHeight] = useState(800);

    const handleResize = () => {
        const breakpoints = [
            { maxWidth: 299, height: 140 },
            { maxWidth: 349, height: 170 },
            { maxWidth: 399, height: 200 },
            { maxWidth: 449, height: 230 },
            { maxWidth: 599, height: 310 },
            { maxWidth: 699, height: 370 },
            { maxWidth: 799, height: 420 },
            { maxWidth: 899, height: 480 },
            { maxWidth: 999, height: 540 },
            { maxWidth: 1099, height: 590 },
            { maxWidth: 1199, height: 645 },
            { maxWidth: 1299, height: 700 },
            { maxWidth: 1399, height: 760 },
            { maxWidth: 1499, height: 820 },
            { maxWidth: 1599, height: 870 },
            { maxWidth: 1699, height: 930 },
            { maxWidth: 1799, height: 990 },
            { maxWidth: 1899, height: 1040 },
            { maxWidth: 1999, height: 1100 },
            { maxWidth: 2099, height: 1160 },
            { maxWidth: 2199, height: 1210 },
            { maxWidth: 2299, height: 1270 },
            { maxWidth: 2399, height: 1325 },
            { maxWidth: 2499, height: 1380 },
            { maxWidth: 2599, height: 1435 },
            { maxWidth: 2699, height: 1490 },
            { maxWidth: 2799, height: 1550 },
            { maxWidth: 2899, height: 1605 },
            { maxWidth: 2999, height: 1660 },
            { maxWidth: 3099, height: 1720 },
            { maxWidth: 3199, height: 1775 },
            { maxWidth: 3299, height: 1830 },
            { maxWidth: 3399, height: 1885 },
            { maxWidth: 3499, height: 1940 },
            { maxWidth: 3599, height: 2000 },
            { maxWidth: 3699, height: 2055 },
            { maxWidth: 3799, height: 2110 },
            { maxWidth: 3899, height: 2130 },
        ];

        const newHeight = breakpoints.find(bp => window.innerWidth < bp.maxWidth)?.height || 2130;
        setCarouselHeight(newHeight);
    };

    useEffect(() => {
        getBannerList();
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const arrowStyles = {
        position: 'absolute',
        background: 'transparent',
        color: 'black',
        border: 'none',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        width: 30,
        height: 30,
        cursor: 'pointer',
    };

    const indicatorStyles = {
        background: '#D3D3D3',
        borderRadius: 30,
        width: 10,
        height: 10,
        display: 'inline-block',
        margin: isMobile ? '9vw 8px' : '6vw 8px',
        cursor: 'pointer',
    };

    return (
        <Box
            sx={{
                borderBottom: loading ? "none" : "7px solid #D9D9D9",
                marginBottom: loading ? "none" : "-7px",
            }}>
            {loading ?
                (
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        width="100%"
                        height={carouselHeight}
                    />
                ) : (
                    <Carousel
                        autoPlay={true}
                        interval={5000}
                        infiniteLoop
                        preventMovementUntilSwipeScrollTolerance={true}
                        swipeScrollTolerance={50}
                        stopOnHover={false}
                        showStatus={false}
                        showThumbs={false}
                        renderArrowPrev={(onClickHandler, hasPrev, label) =>
                            hasPrev && (
                                <KeyboardArrowLeftRoundedIcon
                                    type="button"
                                    onClick={onClickHandler}
                                    title={label}
                                    style={{ ...arrowStyles, left: "2%" }}
                                />
                            )
                        }
                        renderArrowNext={(onClickHandler, hasNext, label) =>
                            hasNext && (
                                <KeyboardArrowRightRoundedIcon
                                    type="button"
                                    onClick={onClickHandler}
                                    title={label}
                                    style={{ ...arrowStyles, right: "2%" }}
                                />
                            )
                        }
                        renderIndicator={(onClickHandler, isSelected, index, label) => {
                            if (isSelected) {
                                return (
                                    <li
                                        style={{ ...indicatorStyles, background: '#ED783E' }}
                                        aria-label={`Selected: ${label} ${index + 1}`}
                                        title={`Selected: ${label} ${index + 1}`}
                                    />
                                );
                            }
                            return (
                                <li
                                    style={indicatorStyles}
                                    onClick={onClickHandler}
                                    onKeyDown={onClickHandler}
                                    value={index}
                                    key={index}
                                    role="button"
                                    tabIndex={0}
                                    title={`${label} ${index + 1}`}
                                    aria-label={`${label} ${index + 1}`}
                                />
                            );
                        }}
                    >
                        {bannerList.map((banner, i) => (
                            <CardActionArea key={i} href={banner.source_url} target='_blank' disableRipple>
                                <Image
                                    key={i}
                                    alt=""
                                    src={banner.source_image}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '100%', height: 'auto' }}
                                    priority
                                />
                            </CardActionArea>
                        ))}
                    </Carousel>
                )}
        </Box>
    );
}

export default banner;