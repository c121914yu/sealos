import React, { useState, useMemo, useEffect } from 'react';
import { Box, Button, Flex, Grid, FormControl, Input, useTheme } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';
import RangeInput from '@/components/RangeInput';
import MySlider from '@/components/Slider';
import MyRangeSlider from '@/components/RangeSlider';
import MyIcon from '@/components/Icon';
import EditEnvs from './EditEnvs';
import type { QueryType } from '@/types';
import type { AppEditType } from '@/types/app';
import { customAlphabet } from 'nanoid';
import { SEALOS_DOMAIN } from '@/store/static';
import Tabs from '@/components/Tabs';
import Tip from '@/components/Tip';
import MySelect from '@/components/Select';
import { useTranslation } from 'next-i18next';
import { INSTALL_ACCOUNT } from '@/store/static';
import PriceBox from './PriceBox';
import dynamic from 'next/dynamic';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 12);
import { obj2Query } from '@/api/tools';

const Form = ({
  formHook,
  pxVal
}: {
  formHook: UseFormReturn<AppEditType, any>;
  pxVal: number;
}) => {
  if (!formHook) return null;
  const { t } = useTranslation();
  const router = useRouter();
  const { name } = router.query as QueryType;
  const theme = useTheme();
  const isEdit = useMemo(() => !!name, [name]);
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors }
  } = formHook;

  const Label = ({
    children,
    w = 'auto',
    ...props
  }: {
    children: string;
    w?: number | 'auto';
    [key: string]: any;
  }) => (
    <Box
      flex={`0 0 ${w === 'auto' ? 'auto' : `${w}px`}`}
      {...props}
      color={'#333'}
      userSelect={'none'}
    >
      {children}
    </Box>
  );

  const boxStyles = {
    border: theme.borders.base,
    borderRadius: 'sm',
    mb: 4,
    bg: 'white'
  };
  const headerStyles = {
    py: 4,
    pl: '46px',
    fontSize: '2xl',
    color: 'myGray.900',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'myWhite.600'
  };

  return (
    <>
      <Grid
        height={'100%'}
        templateColumns={'220px 1fr'}
        gridGap={5}
        alignItems={'start'}
        pl={`${pxVal}px`}
      >
        <Box>
          <Tabs
            list={[
              { id: 'form', label: 'Config Form' },
              { id: 'yaml', label: 'YAML File' }
            ]}
            activeId={'form'}
            onChange={() =>
              router.replace(
                `/deploy?${obj2Query({
                  name,
                  type: 'yaml'
                })}`
              )
            }
          />
          {INSTALL_ACCOUNT && (
            <Box mt={3} borderRadius={'sm'} overflow={'hidden'} backgroundColor={'white'} p={3}>
              <PriceBox
                pods={
                  getValues('hpa.use')
                    ? [getValues('hpa.minReplicas') || 1, getValues('hpa.maxReplicas') || 2]
                    : [getValues('replicas') || 1, getValues('replicas') || 1]
                }
                cpu={getValues('cpu')}
                memory={getValues('memory')}
                storage={getValues('storeList').reduce((sum, item) => sum + item.value, 0)}
              />
            </Box>
          )}
        </Box>

        <Box
          id={'form-container'}
          pr={`${pxVal}px`}
          height={'100%'}
          position={'relative'}
          overflowY={'scroll'}
        >
          {/* base info */}
          <Box id={'baseInfo'} {...boxStyles}>
            <Box {...headerStyles}>
              <MyIcon name={'formInfo'} mr={5} w={'20px'} color={'myGray.500'} />
              {t('Params Config')}
            </Box>
            <Box px={'42px'} py={'24px'}>
              <FormControl mb={7} isInvalid={!!errors.appName} w={'500px'}>
                <Flex alignItems={'center'}>
                  <Label w={80}>{t('App Name')}</Label>
                  <Input
                    disabled={isEdit}
                    title={isEdit ? '不允许修改应用名称' : ''}
                    autoFocus={true}
                    placeholder={'字母开头，仅能包含小写字母、数字和 -'}
                    {...register('appName', {
                      required: '应用名称不能为空',
                      pattern: {
                        value: /^[a-z][a-z0-9]+([-.][a-z0-9]+)*$/g,
                        message: '应用名只能包含小写字母、数字和 -,并且字母开头。'
                      }
                    })}
                  />
                </Flex>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Form;
