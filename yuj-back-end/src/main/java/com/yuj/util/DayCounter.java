package com.yuj.util;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.time.DayOfWeek;
import java.util.List;

public class DayCounter {
    final static int MONDAY 	= 1;
    final static int TUESDAY 	= 2;
    final static int WEDNESDAY 	= 3;
    final static int THURSDAY 	= 4;
    final static int FRIDAY 	= 5;
    final static int SATURDAY 	= 6;

    /**
     *
     * @param day : 바꿀 요일 (0 : 일요일 ~ 6 : 토요일)
     * @return    : 바뀐 요일 (1 : 월요일 ~ 7 : 일요일)
     */
    public static int convertDay(int day) {
        return day == 0 ? 7 : day;
    }

    /**
     *
     * @param from : 시작 날짜
     * @param to   : 종료 날짜
     * @param days : 두 날짜 사이(양 끝 포함)의 개수를 구할 요일들 (1 : 월요일 ~ 7 : 일요일)
     * @return     : 두 날짜 사이(양 끝 포함)에 존재하는 특정 요일들 개수
     */
    public static long cntOfDays(LocalDate from, LocalDate to, int[] days) {
        long count = 0;

        for(int day : days)
            count += cntOfDays(from, to, day);

        return count;
    }

    /**
     *
     * @param from : 시작 날짜
     * @param to   : 종료 날짜
     * @param days : 두 날짜 사이(양 끝 포함)의 개수를 구할 요일들 (1 : 월요일 ~ 7 : 일요일)
     * @return     : 두 날짜 사이(양 끝 포함)에 존재하는 특정 요일들 개수
     */
    public static long cntOfDays(LocalDate from, LocalDate to, List<Integer> days) {
        long count = 0;

        for(int day : days)
            count += cntOfDays(from, to, day);

        return count;
    }

    /**
     *
     * @param from : 시작 날짜
     * @param to   : 종료 날짜
     * @param day   : 두 날짜 사이(양 끝 포함)의 개수를 구할 요일 (1 : 월요일 ~ 7 : 일요일)
     * @return      : 두 날짜 사이(양 끝 포함)에 존재하는 특정 요일 개수
     */
    public static long cntOfDays(LocalDate from, LocalDate to, int day) {
        LocalDate date = null;
        long count = 0;

        switch(day) {
            case MONDAY:
                date = from.with(TemporalAdjusters.nextOrSame(DayOfWeek.MONDAY));
                break;
            case TUESDAY:
                date = from.with(TemporalAdjusters.nextOrSame(DayOfWeek.TUESDAY));
                break;
            case WEDNESDAY:
                date = from.with(TemporalAdjusters.nextOrSame(DayOfWeek.WEDNESDAY));
                break;
            case THURSDAY:
                date = from.with(TemporalAdjusters.nextOrSame(DayOfWeek.THURSDAY));
                break;
            case FRIDAY:
                date = from.with(TemporalAdjusters.nextOrSame(DayOfWeek.FRIDAY));
                break;
            case SATURDAY:
                date = from.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY));
                break;
            default:
                date = from.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
        }

        while(!date.isAfter(to)) {
            count++;
            date = date.plus(1, ChronoUnit.WEEKS);
        }

        return count;
    }
}